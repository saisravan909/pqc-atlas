# Contributing

> How to add algorithms, extend language support, and contribute to PQC-Atlas.

---

## Who Should Contribute

| Role | What You Can Add |
|------|-----------------|
| Security engineer | New algorithm detection rules in the LSDB |
| Language expert | New language scanners (Rust, C/C++, JavaScript) |
| Compliance specialist | Improved NIST/CNSA alignment and CBOM structure |
| DevSecOps engineer | New CI/CD integration templates |
| Security researcher | False negative reports — algorithms PQC-Atlas misses |

---

## Prerequisites

```bash
# Required
go version   # Must be 1.21+
git --version

# Optional but recommended
go install golang.org/x/tools/gopls@latest   # Go language server
```

No package manager, no Docker, no external dependencies.

---

## Setup

```bash
git clone https://github.com/saisravan909/pqc-atlas.git
cd pqc-atlas

# Run against the example app
go run main.go scan --path examples/legacy-app/

# Run all tests
go test ./...

# Build the binary
go build -o bin/pqc-atlas main.go
```

---

## Adding a New Algorithm

All algorithm definitions live in `pkg/lsdb/standards.go`.

**Step 1 — Add the entry:**

```go
{
    Name:            "YourAlgorithm",
    OID:             "1.2.3.4.5",          // ITU-T OID if applicable
    QuantumRisk:     "Quantum-Vulnerable (HNDL Risk)",
    QES:             1.00,
    NISTReplacement: "FIPS 203 — ML-KEM (CRYSTALS-Kyber)",
    FIPS:            "FIPS 203",
},
```

**QES guidelines:**

| Algorithm Type | Starting QES |
|---------------|-------------|
| Public-key (RSA, ECC, DSA) | 0.90–1.10 |
| Hash functions (MD5, SHA-1) | 0.60–0.89 |
| Symmetric (DES, AES-128) | 0.60–0.75 |
| Classically deprecated only | 0.30–0.59 |

**Step 2 — Add a test case:**

```go
// pkg/lsdb/standards_test.go
func TestYourAlgorithm(t *testing.T) {
    result, found := Lookup("YourAlgorithm")
    if !found {
        t.Fatal("YourAlgorithm not found in LSDB")
    }
    if result.QES != 1.00 {
        t.Errorf("expected QES 1.00, got %f", result.QES)
    }
}
```

**Step 3 — Add example code to `examples/legacy-app/`** so the scanner can be validated against it.

---

## Adding a New Language Scanner

**Step 1 — Create the scanner file:**

```bash
touch pkg/scanner/rust.go
```

**Step 2 — Implement the interface:**

```go
package scanner

import (
    "bufio"
    "os"
    "path/filepath"
    "regexp"
    "strings"
)

var rustPatterns = map[string]*regexp.Regexp{
    "RSA-Legacy": regexp.MustCompile(`rsa::RsaPrivateKey::new`),
    "ECDSA-Legacy": regexp.MustCompile(`p256::ecdsa|k256::ecdsa`),
    // Add more patterns
}

func ScanRust(path string) ([]Finding, error) {
    var findings []Finding
    err := filepath.Walk(path, func(file string, info os.FileInfo, err error) error {
        if err != nil || info.IsDir() || !strings.HasSuffix(file, ".rs") {
            return err
        }
        findings = append(findings, scanRustFile(file)...)
        return nil
    })
    return findings, err
}
```

**Step 3 — Register in `main.go`:**

```go
// Add alongside existing scanners
rustFindings, err := scanner.ScanRust(targetPath)
allFindings = append(allFindings, rustFindings...)
```

**Step 4 — Add example Rust files to `examples/legacy-app/`.**

---

## Code Standards

| Rule | Rationale |
|------|-----------|
| No external dependencies | Supply-chain safety — stdlib only |
| No global state | All scanner functions must be pure and stateless |
| Table-driven tests | Every detection rule needs a test case |
| Plain English comments | Assume the reader is a security engineer, not a Go expert |
| `go vet` must pass clean | No warnings |

---

## Pull Request Checklist

Before opening a PR, confirm:

- [ ] `go test ./...` passes
- [ ] `go vet ./...` passes with no warnings
- [ ] New detection rule has a test case in `pkg/lsdb/standards_test.go` or `pkg/scanner/`
- [ ] Tested against `examples/legacy-app/`
- [ ] No external dependencies added
- [ ] Comments written in plain English
- [ ] CBOM output is valid CycloneDX 1.7 if CBOM structure was changed

---

## Reporting False Negatives

If you find a quantum-vulnerable algorithm that PQC-Atlas misses, please [open an issue](https://github.com/saisravan909/pqc-atlas/issues) with:

1. The algorithm name and OID
2. A minimal code snippet that triggers the usage
3. The language and library context
4. The NIST replacement, if known

False negatives are treated as high-priority bugs.
