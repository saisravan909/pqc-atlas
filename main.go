package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/saisravan909/pqc-atlas/pkg/cbom"
	"github.com/saisravan909/pqc-atlas/pkg/scanner"
)

const version = "0.1.0"

func main() {
	if len(os.Args) < 2 {
		printUsage()
		os.Exit(1)
	}

	switch os.Args[1] {
	case "scan":
		runScan(os.Args[2:])
	case "audit":
		runAudit(os.Args[2:])
	case "export":
		runExport(os.Args[2:])
	case "version":
		fmt.Printf("pqc-atlas v%s\n", version)
	default:
		fmt.Fprintf(os.Stderr, "error: unknown command %q\n\n", os.Args[1])
		printUsage()
		os.Exit(1)
	}
}

func printUsage() {
	fmt.Println("PQC-Atlas — Cryptographic Bill of Materials Generator")
	fmt.Println()
	fmt.Println("Usage:")
	fmt.Println("  pqc-atlas scan   --path <dir> [--format table|json]")
	fmt.Println("  pqc-atlas audit  --path <dir> [--fail-on-violation]")
	fmt.Println("  pqc-atlas export --path <dir> --out <file>")
	fmt.Println("  pqc-atlas version")
}

func runScan(args []string) {
	fs := flag.NewFlagSet("scan", flag.ExitOnError)
	path := fs.String("path", ".", "Directory to scan")
	format := fs.String("format", "table", "Output format: table or json")
	_ = fs.Parse(args)

	findings, err := scanner.ScanPath(*path)
	if err != nil {
		fmt.Fprintf(os.Stderr, "scan error: %v\n", err)
		os.Exit(1)
	}

	if len(findings) == 0 {
		fmt.Println("No quantum-vulnerable cryptographic primitives detected.")
		return
	}

	switch *format {
	case "json":
		cbom.Export(findings, os.Stdout)
	default:
		scanner.PrintTable(findings)
	}
}

func runAudit(args []string) {
	fs := flag.NewFlagSet("audit", flag.ExitOnError)
	path := fs.String("path", ".", "Directory to audit")
	failOnViolation := fs.Bool("fail-on-violation", false, "Exit with code 1 if violations found")
	_ = fs.Parse(args)

	findings, err := scanner.ScanPath(*path)
	if err != nil {
		fmt.Fprintf(os.Stderr, "audit error: %v\n", err)
		os.Exit(1)
	}

	violations := scanner.FilterViolations(findings)

	if len(violations) == 0 {
		fmt.Println("[PASS] No quantum-vulnerable algorithms detected. Codebase is PQC compliant.")
		return
	}

	fmt.Printf("[FAIL] %d quantum-vulnerable algorithm(s) detected:\n\n", len(violations))
	scanner.PrintTable(violations)

	if *failOnViolation {
		os.Exit(1)
	}
}

func runExport(args []string) {
	fs := flag.NewFlagSet("export", flag.ExitOnError)
	path := fs.String("path", ".", "Directory to scan")
	out := fs.String("out", "cbom.json", "Output file path")
	_ = fs.Parse(args)

	findings, err := scanner.ScanPath(*path)
	if err != nil {
		fmt.Fprintf(os.Stderr, "export error: %v\n", err)
		os.Exit(1)
	}

	f, err := os.Create(*out)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to create output file: %v\n", err)
		os.Exit(1)
	}
	defer f.Close()

	cbom.Export(findings, f)
	fmt.Printf("CBOM exported to %s (%d finding(s))\n", *out, len(findings))
}
