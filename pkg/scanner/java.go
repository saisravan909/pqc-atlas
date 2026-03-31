package scanner

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

// javaVulnPattern defines a regex-based detection rule for Java source files.
type javaVulnPattern struct {
	Pattern         *regexp.Regexp
	Algorithm       string
	Risk            RiskLevel
	AlgorithmWeight float64
	NISTReplacement string
	Description     string
	FunctionCall    string
}

var javaPatterns = []javaVulnPattern{
	{
		Pattern:         regexp.MustCompile(`KeyPairGenerator\.getInstance\s*\(\s*"RSA"`),
		Algorithm:       "RSA-Legacy",
		Risk:            RiskCritical,
		AlgorithmWeight: 1.0,
		NISTReplacement: "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
		Description:     "RSA is broken by Shor's Algorithm on a sufficiently powerful quantum computer.",
		FunctionCall:    "KeyPairGenerator.getInstance(\"RSA\")",
	},
	{
		Pattern:         regexp.MustCompile(`Cipher\.getInstance\s*\(\s*"RSA`),
		Algorithm:       "RSA-Legacy",
		Risk:            RiskCritical,
		AlgorithmWeight: 1.0,
		NISTReplacement: "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
		Description:     "RSA cipher mode is broken by Shor's Algorithm.",
		FunctionCall:    "Cipher.getInstance(\"RSA/...\")",
	},
	{
		Pattern:         regexp.MustCompile(`KeyPairGenerator\.getInstance\s*\(\s*"EC"`),
		Algorithm:       "ECC-Legacy",
		Risk:            RiskCritical,
		AlgorithmWeight: 0.95,
		NISTReplacement: "FIPS 203 — ML-KEM (CRYSTALS-Kyber)",
		Description:     "Elliptic curve cryptography is vulnerable to Shor's Algorithm.",
		FunctionCall:    "KeyPairGenerator.getInstance(\"EC\")",
	},
	{
		Pattern:         regexp.MustCompile(`KeyPairGenerator\.getInstance\s*\(\s*"DSA"`),
		Algorithm:       "DSA-Legacy",
		Risk:            RiskCritical,
		AlgorithmWeight: 1.0,
		NISTReplacement: "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
		Description:     "DSA is broken by Shor's Algorithm on a sufficiently powerful quantum computer.",
		FunctionCall:    "KeyPairGenerator.getInstance(\"DSA\")",
	},
	{
		Pattern:         regexp.MustCompile(`Signature\.getInstance\s*\(\s*"SHA\d*with(RSA|ECDSA)"`),
		Algorithm:       "RSA-Legacy",
		Risk:            RiskCritical,
		AlgorithmWeight: 1.0,
		NISTReplacement: "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
		Description:     "RSA-based signature schemes are broken by Shor's Algorithm.",
		FunctionCall:    "Signature.getInstance(\"SHA*withRSA\")",
	},
	{
		Pattern:         regexp.MustCompile(`MessageDigest\.getInstance\s*\(\s*"MD5"`),
		Algorithm:       "MD5",
		Risk:            RiskHigh,
		AlgorithmWeight: 0.6,
		NISTReplacement: "SHA-3 (FIPS 202)",
		Description:     "MD5 is classically broken and weakened further by Grover's Algorithm.",
		FunctionCall:    "MessageDigest.getInstance(\"MD5\")",
	},
	{
		Pattern:         regexp.MustCompile(`MessageDigest\.getInstance\s*\(\s*"SHA-1"`),
		Algorithm:       "SHA-1",
		Risk:            RiskMedium,
		AlgorithmWeight: 0.4,
		NISTReplacement: "SHA-3 (FIPS 202)",
		Description:     "SHA-1 is classically deprecated and weakened by Grover's Algorithm.",
		FunctionCall:    "MessageDigest.getInstance(\"SHA-1\")",
	},
}

// ScanJavaFile performs regex-based cryptographic discovery on a Java source file.
func ScanJavaFile(path string) ([]Finding, error) {
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
		if strings.HasPrefix(trimmed, "//") || strings.HasPrefix(trimmed, "*") {
			continue
		}

		for _, p := range javaPatterns {
			if p.Pattern.MatchString(line) {
				exposureFactor := 0.9
				timeDrift := 0.15
				qes := (p.AlgorithmWeight * exposureFactor) + timeDrift

				findings = append(findings, Finding{
					File:            path,
					Line:            lineNum,
					Algorithm:       p.Algorithm,
					Package:         "java.security / javax.crypto",
					FunctionCall:    p.FunctionCall,
					Risk:            p.Risk,
					RiskDescription: riskDescription(p.Risk),
					QES:             qes,
					NISTReplacement: p.NISTReplacement,
					Description:     p.Description,
				})
				fmt.Printf("[java]   %s:%d — %s detected\n", path, lineNum, p.Algorithm)
			}
		}
	}

	return findings, scanner.Err()
}
