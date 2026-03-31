package main

import (
	"fmt"
	"os"
	"time"

	"github.com/saisravan909/pqc-atlas/pkg/cbom"
	"github.com/saisravan909/pqc-atlas/pkg/scanner"
)

func main() {
	fmt.Println("--------------------------------------------------")
	fmt.Println(" PQC-ATLAS: Cryptographic Observability Engine")
	fmt.Println(" Status: NIST FIPS 203/204 Compliance Mode")
	fmt.Println("--------------------------------------------------")

	if len(os.Args) < 3 {
		fmt.Println("Usage: pqc-atlas scan --path <directory>")
		fmt.Println("       pqc-atlas audit --path <directory> [--fail-on-violation]")
		fmt.Println("       pqc-atlas export --path <directory> --out <file>")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "scan":
		runScan()
	case "audit":
		runAudit()
	case "export":
		runExport()
	default:
		fmt.Fprintf(os.Stderr, "[!] Unknown command: %s\n", os.Args[1])
		os.Exit(1)
	}
}

func runScan() {
	if len(os.Args) < 4 {
		fmt.Println("[!] Usage: pqc-atlas scan --path <directory>")
		os.Exit(1)
	}

	targetPath := os.Args[3]
	fmt.Printf("[*] Initializing AST Discovery on: %s\n", targetPath)

	start := time.Now()

	findings, err := scanner.PerformScan(targetPath)
	if err != nil {
		fmt.Printf("[!] Error during scan: %v\n", err)
		os.Exit(1)
	}

	duration := time.Since(start)
	fmt.Printf("[+] Scan Complete. Found %d cryptographic primitives.\n", len(findings))
	fmt.Printf("[+] Time Elapsed: %v\n", duration)
	fmt.Println("--------------------------------------------------")

	if len(findings) > 0 {
		scanner.PrintTable(findings)
		fmt.Println("--------------------------------------------------")
	}

	fmt.Println("[*] Exporting CycloneDX 1.7 CBOM to: ./cbom.json")

	f, err := os.Create("cbom.json")
	if err != nil {
		fmt.Printf("[!] Failed to create cbom.json: %v\n", err)
		os.Exit(1)
	}
	defer f.Close()
	cbom.Export(findings, f)

	fmt.Printf("[+] CBOM written successfully (%d component(s))\n", len(findings))
}

func runAudit() {
	if len(os.Args) < 4 {
		fmt.Println("[!] Usage: pqc-atlas audit --path <directory>")
		os.Exit(1)
	}

	targetPath := os.Args[3]
	failOnViolation := len(os.Args) > 4 && os.Args[4] == "--fail-on-violation"

	fmt.Printf("[*] Running Compliance Audit on: %s\n", targetPath)

	findings, err := scanner.PerformScan(targetPath)
	if err != nil {
		fmt.Printf("[!] Error during audit: %v\n", err)
		os.Exit(1)
	}

	violations := scanner.FilterViolations(findings)
	fmt.Println("--------------------------------------------------")

	if len(violations) == 0 {
		fmt.Println("[PASS] No quantum-vulnerable algorithms detected.")
		fmt.Println("[PASS] Codebase is NIST PQC compliant.")
		return
	}

	fmt.Printf("[FAIL] %d quantum-vulnerable algorithm(s) detected:\n\n", len(violations))
	scanner.PrintTable(violations)

	if failOnViolation {
		os.Exit(1)
	}
}

func runExport() {
	if len(os.Args) < 4 {
		fmt.Println("[!] Usage: pqc-atlas export --path <directory> --out <file>")
		os.Exit(1)
	}

	targetPath := os.Args[3]
	outFile := "cbom.json"
	for i, arg := range os.Args {
		if arg == "--out" && i+1 < len(os.Args) {
			outFile = os.Args[i+1]
		}
	}

	fmt.Printf("[*] Exporting CBOM for: %s\n", targetPath)

	findings, err := scanner.PerformScan(targetPath)
	if err != nil {
		fmt.Printf("[!] Export error: %v\n", err)
		os.Exit(1)
	}

	f, err := os.Create(outFile)
	if err != nil {
		fmt.Printf("[!] Failed to create %s: %v\n", outFile, err)
		os.Exit(1)
	}
	defer f.Close()

	cbom.Export(findings, f)
	fmt.Printf("[+] CBOM exported to %s (%d finding(s))\n", outFile, len(findings))
}
