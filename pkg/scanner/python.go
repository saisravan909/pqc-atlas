package scanner

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

// pythonVulnPattern defines a regex-based detection rule for Python source files.
type pythonVulnPattern struct {
	Pattern         *regexp.Regexp
	Algorithm       string
	Risk            RiskLevel
	AlgorithmWeight float64
	NISTReplacement string
	Description     string
	FunctionCall    string
}

var pythonPatterns = []pythonVulnPattern{
	{
		Pattern:         regexp.MustCompile(`rsa\.generate_private_key\s*\(`),
		Algorithm:       "RSA-Legacy",
		Risk:            RiskCritical,
		AlgorithmWeight: 1.0,
		NISTReplacement: "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
		Description:     "RSA is broken by Shor's Algorithm on a sufficiently powerful quantum computer.",
		FunctionCall:    "rsa.generate_private_key()",
	},
	{
		Pattern:         regexp.MustCompile(`RSA\.generate\s*\(`),
		Algorithm:       "RSA-Legacy",
		Risk:            RiskCritical,
		AlgorithmWeight: 1.0,
		NISTReplacement: "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
		Description:     "RSA is broken by Shor's Algorithm on a sufficiently powerful quantum computer.",
		FunctionCall:    "RSA.generate()",
	},
	{
		Pattern:         regexp.MustCompile(`ec\.generate_private_key\s*\(`),
		Algorithm:       "ECC-Legacy",
		Risk:            RiskCritical,
		AlgorithmWeight: 0.95,
		NISTReplacement: "FIPS 203 — ML-KEM (CRYSTALS-Kyber)",
		Description:     "Elliptic curve cryptography is vulnerable to Shor's Algorithm.",
		FunctionCall:    "ec.generate_private_key()",
	},
	{
		Pattern:         regexp.MustCompile(`dsa\.generate_parameters\s*\(`),
		Algorithm:       "DSA-Legacy",
		Risk:            RiskCritical,
		AlgorithmWeight: 1.0,
		NISTReplacement: "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
		Description:     "DSA is broken by Shor's Algorithm on a sufficiently powerful quantum computer.",
		FunctionCall:    "dsa.generate_parameters()",
	},
	{
		Pattern:         regexp.MustCompile(`hashlib\.md5\s*\(`),
		Algorithm:       "MD5",
		Risk:            RiskHigh,
		AlgorithmWeight: 0.6,
		NISTReplacement: "SHA-3 (FIPS 202)",
		Description:     "MD5 is classically broken and weakened further by Grover's Algorithm.",
		FunctionCall:    "hashlib.md5()",
	},
	{
		Pattern:         regexp.MustCompile(`hashlib\.sha1\s*\(`),
		Algorithm:       "SHA-1",
		Risk:            RiskMedium,
		AlgorithmWeight: 0.4,
		NISTReplacement: "SHA-3 (FIPS 202)",
		Description:     "SHA-1 is classically deprecated and weakened by Grover's Algorithm.",
		FunctionCall:    "hashlib.sha1()",
	},
}

// ScanPythonFile performs regex-based cryptographic discovery on a Python source file.
func ScanPythonFile(path string) ([]Finding, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	var findings []Finding
	lineNum := 0

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		lineNum++
		line := scanner.Text()
		trimmed := strings.TrimSpace(line)
		if strings.HasPrefix(trimmed, "#") {
			continue
		}

		for _, p := range pythonPatterns {
			if p.Pattern.MatchString(line) {
				exposureFactor := 0.9
				timeDrift := 0.15
				qes := (p.AlgorithmWeight * exposureFactor) + timeDrift

				findings = append(findings, Finding{
					File:            path,
					Line:            lineNum,
					Algorithm:       p.Algorithm,
					Package:         "python:cryptography",
					FunctionCall:    p.FunctionCall,
					Risk:            p.Risk,
					RiskDescription: riskDescription(p.Risk),
					QES:             qes,
					NISTReplacement: p.NISTReplacement,
					Description:     p.Description,
				})
				fmt.Printf("[python] %s:%d — %s detected\n", path, lineNum, p.Algorithm)
			}
		}
	}

	return findings, scanner.Err()
}
