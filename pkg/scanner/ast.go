package scanner

import (
        "fmt"
        "go/ast"
        "go/parser"
        "go/token"
        "os"
        "path/filepath"
        "strings"
        "text/tabwriter"
)

// RiskLevel represents the quantum vulnerability severity of a finding.
type RiskLevel string

const (
        RiskCritical RiskLevel = "CRITICAL"
        RiskHigh     RiskLevel = "HIGH"
        RiskMedium   RiskLevel = "MEDIUM"
        RiskLow      RiskLevel = "LOW"
)

// Finding represents a discovered cryptographic primitive.
type Finding struct {
        File            string
        Line            int
        Algorithm       string
        KeySize         int
        Package         string
        FunctionCall    string
        Risk            RiskLevel
        RiskDescription string
        QES             float64
        NISTReplacement string
        Description     string
}

// vulnerablePackages maps import paths to algorithm metadata.
var vulnerablePackages = map[string]struct {
        Algorithm       string
        Risk            RiskLevel
        AlgorithmWeight float64
        NISTReplacement string
        Description     string
}{
        "crypto/rsa": {
                Algorithm:       "RSA-Legacy",
                Risk:            RiskCritical,
                AlgorithmWeight: 1.0,
                NISTReplacement: "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
                Description:     "RSA is broken by Shor's Algorithm on a sufficiently powerful quantum computer.",
        },
        "crypto/ecdsa": {
                Algorithm:       "ECDSA-Legacy",
                Risk:            RiskCritical,
                AlgorithmWeight: 1.0,
                NISTReplacement: "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
                Description:     "ECDSA is broken by Shor's Algorithm on a sufficiently powerful quantum computer.",
        },
        "crypto/elliptic": {
                Algorithm:       "ECC-Legacy",
                Risk:            RiskCritical,
                AlgorithmWeight: 0.95,
                NISTReplacement: "FIPS 203 — ML-KEM (CRYSTALS-Kyber)",
                Description:     "Elliptic curve cryptography is vulnerable to Shor's Algorithm.",
        },
        "crypto/dsa": {
                Algorithm:       "DSA-Legacy",
                Risk:            RiskCritical,
                AlgorithmWeight: 1.0,
                NISTReplacement: "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
                Description:     "DSA is broken by Shor's Algorithm on a sufficiently powerful quantum computer.",
        },
        "crypto/md5": {
                Algorithm:       "MD5",
                Risk:            RiskHigh,
                AlgorithmWeight: 0.6,
                NISTReplacement: "SHA-3 (FIPS 202)",
                Description:     "MD5 is classically broken and weakened further by Grover's Algorithm.",
        },
        "crypto/sha1": {
                Algorithm:       "SHA-1",
                Risk:            RiskMedium,
                AlgorithmWeight: 0.4,
                NISTReplacement: "SHA-3 (FIPS 202)",
                Description:     "SHA-1 is classically deprecated and weakened by Grover's Algorithm.",
        },
        "golang.org/x/crypto/des": {
                Algorithm:       "DES",
                Risk:            RiskCritical,
                AlgorithmWeight: 0.9,
                NISTReplacement: "AES-256",
                Description:     "DES uses a 56-bit key; trivially broken by Grover's Algorithm.",
        },
}

// riskDescription builds the human-readable risk label including HNDL context.
func riskDescription(risk RiskLevel) string {
        switch risk {
        case RiskCritical:
                return "Quantum-Vulnerable (HNDL Risk)"
        case RiskHigh:
                return "Quantum-Weakened (HNDL Risk)"
        case RiskMedium:
                return "Classically Deprecated"
        default:
                return "Low Risk"
        }
}

// PerformScan is the primary entry point called by the CLI.
func PerformScan(root string) ([]Finding, error) {
        return ScanPath(root)
}

// skipDirs are directories never scanned regardless of language.
var skipDirs = map[string]bool{
        "vendor": true, "node_modules": true, ".git": true,
        "dist": true, "bin": true, "tmp": true,
}

// ScanPath walks the given directory, dispatching each file to the
// appropriate language scanner (Go AST, Python regex, Java regex).
func ScanPath(root string) ([]Finding, error) {
        var findings []Finding

        err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
                if err != nil {
                        return err
                }
                if info.IsDir() {
                        if skipDirs[info.Name()] || strings.HasPrefix(info.Name(), ".") {
                                return filepath.SkipDir
                        }
                        return nil
                }

                var fileFindings []Finding
                var parseErr error

                switch {
                case strings.HasSuffix(path, ".go"):
                        fileFindings, parseErr = parseFile(path)
                case strings.HasSuffix(path, ".py"):
                        fileFindings, parseErr = ScanPythonFile(path)
                case strings.HasSuffix(path, ".java"):
                        fileFindings, parseErr = ScanJavaFile(path)
                }

                if parseErr == nil {
                        findings = append(findings, fileFindings...)
                }
                return nil
        })

        return findings, err
}

// parseFile parses a single Go source file and returns all findings.
func parseFile(path string) ([]Finding, error) {
        fset := token.NewFileSet()
        node, err := parser.ParseFile(fset, path, nil, parser.ParseComments)
        if err != nil {
                return nil, err
        }

        var findings []Finding
        importedPackages := extractImports(node)

        ast.Inspect(node, func(n ast.Node) bool {
                callExpr, ok := n.(*ast.CallExpr)
                if !ok {
                        return true
                }

                finding, found := analyzeCallExpr(callExpr, importedPackages, fset, path)
                if found {
                        findings = append(findings, finding)
                }
                return true
        })

        return findings, nil
}

// extractImports returns the set of imported paths in a file.
func extractImports(node *ast.File) map[string]string {
        imports := make(map[string]string)
        for _, imp := range node.Imports {
                importPath := strings.Trim(imp.Path.Value, `"`)
                var alias string
                if imp.Name != nil {
                        alias = imp.Name.Name
                } else {
                        parts := strings.Split(importPath, "/")
                        alias = parts[len(parts)-1]
                }
                imports[alias] = importPath
        }
        return imports
}

// analyzeCallExpr checks whether a call expression uses a vulnerable crypto primitive.
func analyzeCallExpr(call *ast.CallExpr, imports map[string]string, fset *token.FileSet, path string) (Finding, bool) {
        sel, ok := call.Fun.(*ast.SelectorExpr)
        if !ok {
                return Finding{}, false
        }

        ident, ok := sel.X.(*ast.Ident)
        if !ok {
                return Finding{}, false
        }

        pkgAlias := ident.Name
        fullPath, exists := imports[pkgAlias]
        if !exists {
                return Finding{}, false
        }

        meta, vulnerable := vulnerablePackages[fullPath]
        if !vulnerable {
                return Finding{}, false
        }

        pos := fset.Position(call.Pos())
        keySize := extractKeySize(call)
        exposureFactor := calculateExposureFactor(sel.Sel.Name, keySize)
        timeDrift := 0.15
        qes := (meta.AlgorithmWeight * exposureFactor) + timeDrift

        return Finding{
                File:            path,
                Line:            pos.Line,
                Algorithm:       meta.Algorithm,
                KeySize:         keySize,
                Package:         fullPath,
                FunctionCall:    fmt.Sprintf("%s.%s", pkgAlias, sel.Sel.Name),
                Risk:            meta.Risk,
                RiskDescription: riskDescription(meta.Risk),
                QES:             qes,
                NISTReplacement: meta.NISTReplacement,
                Description:     meta.Description,
        }, true
}

// extractKeySize attempts to read a key size integer literal from a call's arguments.
func extractKeySize(call *ast.CallExpr) int {
        for _, arg := range call.Args {
                if lit, ok := arg.(*ast.BasicLit); ok && lit.Kind == token.INT {
                        var size int
                        fmt.Sscanf(lit.Value, "%d", &size)
                        if size > 0 {
                                return size
                        }
                }
        }
        return 0
}

// calculateExposureFactor assigns a score based on how exposed the function call is.
func calculateExposureFactor(funcName string, keySize int) float64 {
        base := 0.7
        highExposure := map[string]bool{
                "GenerateKey": true, "Sign": true, "Encrypt": true,
                "Decrypt": true, "Verify": true, "GenerateMultiPrimeKey": true,
        }
        if highExposure[funcName] {
                base = 0.9
        }
        if keySize > 0 && keySize < 3072 {
                base += 0.05
        }
        return base
}

// FilterViolations returns only findings with CRITICAL or HIGH risk.
func FilterViolations(findings []Finding) []Finding {
        var violations []Finding
        for _, f := range findings {
                if f.Risk == RiskCritical || f.Risk == RiskHigh {
                        violations = append(violations, f)
                }
        }
        return violations
}

// PrintTable writes findings to stdout in a human-readable table format.
func PrintTable(findings []Finding) {
        w := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', 0)
        fmt.Fprintln(w, "FILE\tLINE\tALGORITHM\tCALL\tRISK\tQES\tREPLACEMENT")
        fmt.Fprintln(w, "----\t----\t---------\t----\t----\t---\t-----------")
        for _, f := range findings {
                keySizeStr := ""
                if f.KeySize > 0 {
                        keySizeStr = fmt.Sprintf("-%d", f.KeySize)
                }
                fmt.Fprintf(w, "%s\t%d\t%s%s\t%s\t%s\t%.2f\t%s\n",
                        f.File, f.Line,
                        f.Algorithm, keySizeStr,
                        f.FunctionCall,
                        f.RiskDescription, f.QES,
                        f.NISTReplacement,
                )
        }
        w.Flush()
}
