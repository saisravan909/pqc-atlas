package cbom

import (
	"encoding/json"
	"fmt"
	"io"
	"time"

	"github.com/saisravan909/pqc-atlas/pkg/scanner"
)

// CycloneDX 1.7 compliant CBOM structures

type BOM struct {
	BOMFormat   string      `json:"bomFormat"`
	SpecVersion string      `json:"specVersion"`
	Version     int         `json:"version"`
	SerialNumber string     `json:"serialNumber"`
	Metadata    Metadata    `json:"metadata"`
	Components  []Component `json:"components"`
}

type Metadata struct {
	Timestamp string    `json:"timestamp"`
	Tools     []Tool    `json:"tools"`
}

type Tool struct {
	Vendor  string `json:"vendor"`
	Name    string `json:"name"`
	Version string `json:"version"`
}

type Component struct {
	Type            string           `json:"type"`
	BOMRef          string           `json:"bom-ref"`
	Name            string           `json:"name"`
	Version         string           `json:"version,omitempty"`
	Description     string           `json:"description"`
	Properties      []Property       `json:"properties"`
	CryptoProperties *CryptoProperties `json:"cryptoProperties,omitempty"`
}

type CryptoProperties struct {
	AssetType       string          `json:"assetType"`
	AlgorithmProperties AlgorithmProps `json:"algorithmProperties"`
}

type AlgorithmProps struct {
	Primitive        string `json:"primitive"`
	ParameterSetIdentifier string `json:"parameterSetIdentifier,omitempty"`
	ExecutionEnvironment string `json:"executionEnvironment"`
	ImplementationPlatform string `json:"implementationPlatform"`
	CertificationLevel []string `json:"certificationLevel"`
	CryptoFunctions  []string `json:"cryptoFunctions"`
	ClassicalSecurityLevel int `json:"classicalSecurityLevel,omitempty"`
	NistQuantumSecurityLevel int `json:"nistQuantumSecurityLevel"`
}

type Property struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

// Export serialises findings into a CycloneDX 1.7 CBOM and writes it to w.
func Export(findings []scanner.Finding, w io.Writer) {
	bom := BOM{
		BOMFormat:    "CycloneDX",
		SpecVersion:  "1.7",
		Version:      1,
		SerialNumber: fmt.Sprintf("urn:uuid:pqc-atlas-%d", time.Now().UnixNano()),
		Metadata: Metadata{
			Timestamp: time.Now().UTC().Format(time.RFC3339),
			Tools: []Tool{
				{
					Vendor:  "Sai Sravan Cherukuri",
					Name:    "pqc-atlas",
					Version: "0.1.0",
				},
			},
		},
		Components: make([]Component, 0, len(findings)),
	}

	for i, f := range findings {
		component := buildComponent(i+1, f)
		bom.Components = append(bom.Components, component)
	}

	enc := json.NewEncoder(w)
	enc.SetIndent("", "  ")
	_ = enc.Encode(bom)
}

func buildComponent(idx int, f scanner.Finding) Component {
	keySizeStr := ""
	if f.KeySize > 0 {
		keySizeStr = fmt.Sprintf("%d", f.KeySize)
	}

	nistLevel := nistQuantumLevel(f.Algorithm)

	return Component{
		Type:        "cryptographic-asset",
		BOMRef:      fmt.Sprintf("pqc-finding-%d", idx),
		Name:        f.Algorithm,
		Description: f.Description,
		CryptoProperties: &CryptoProperties{
			AssetType: "algorithm",
			AlgorithmProperties: AlgorithmProps{
				Primitive:              mapPrimitive(f.Algorithm),
				ParameterSetIdentifier: keySizeStr,
				ExecutionEnvironment:   "software",
				ImplementationPlatform: "go",
				CertificationLevel:     []string{"none"},
				CryptoFunctions:        []string{f.FunctionCall},
				NistQuantumSecurityLevel: nistLevel,
			},
		},
		Properties: []Property{
			{Name: "pqc-atlas:file", Value: f.File},
			{Name: "pqc-atlas:line", Value: fmt.Sprintf("%d", f.Line)},
			{Name: "pqc-atlas:risk", Value: string(f.Risk)},
			{Name: "pqc-atlas:qes", Value: fmt.Sprintf("%.4f", f.QES)},
			{Name: "pqc-atlas:package", Value: f.Package},
			{Name: "pqc-atlas:nist-replacement", Value: f.NISTReplacement},
		},
	}
}

func mapPrimitive(algorithm string) string {
	switch algorithm {
	case "RSA":
		return "public-key-encryption"
	case "ECDSA", "DSA":
		return "signature"
	case "ECC":
		return "key-agree"
	case "MD5", "SHA-1":
		return "hash"
	case "DES":
		return "block-cipher"
	default:
		return "other"
	}
}

func nistQuantumLevel(algorithm string) int {
	switch algorithm {
	case "RSA", "ECDSA", "ECC", "DSA", "DES":
		return 0
	case "MD5":
		return 0
	case "SHA-1":
		return 0
	default:
		return 0
	}
}
