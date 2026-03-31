# Contributing to PQC-Atlas

Thank you for your interest in PQC-Atlas. This document explains how to set up your environment, submit contributions, and understand the project structure.

---

## Table of Contents

- [Who Should Contribute](#who-should-contribute)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Project Structure](#project-structure)
- [Running the Scanner](#running-the-scanner)
- [Adding a New Algorithm](#adding-a-new-algorithm)
- [Adding a New Language](#adding-a-new-language)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code Standards](#code-standards)

---

## Who Should Contribute

PQC-Atlas welcomes contributions from:

- **Security engineers** adding new cryptographic detection rules
- **Language experts** extending scanning to new languages (Rust, C, C++, JavaScript)
- **Compliance specialists** improving NIST/CNSA alignment and CBOM output
- **DevSecOps engineers** improving CI/CD integration patterns

---

## Prerequisites

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Go | 1.21+ | Scanner engine |
| Git | Any | Version control |

No external dependencies. PQC-Atlas uses Go standard library only.

---

## Local Setup

```bash
# Clone the repository
git clone https://github.com/saisravan909/pqc-atlas.git
cd pqc-atlas

# Verify Go installation
go version

# Run the scanner against the included example app
go run main.go scan --path examples/legacy-app/

# Run all tests
go test ./...

# Build the binary
go build -o bin/pqc-atlas main.go
```

---

## Project Structure

```
pqc-atlas/
├── main.go                    # CLI entry point — scan, report, gate commands
├── pkg/
│   ├── scanner/
│   │   ├── ast.go             # Go AST scanner (structural code analysis)
│   │   ├── python.go          # Python regex scanner
│   │   └── java.go            # Java regex scanner
│   ├── cbom/
│   │   └── cyclonedx.go       # CycloneDX 1.7 CBOM generator
│   └── lsdb/
│       └── standards.go       # Local Standards Database — algorithm → NIST mapping
├── examples/
│   └── legacy-app/            # Realistic test target with intentional vulnerabilities
│       ├── main.go
│       ├── auth_service.py
│       └── TokenService.java
├── .github/
│   └── workflows/
│       └── pqc-audit.yml      # GitHub Actions CI gate
├── GLOSSARY.md                # Acronyms and risk taxonomy reference
├── ROADMAP.md                 # Planned features and milestones
└── SECURITY.md                # Vulnerability disclosure policy
```

---

## Running the Scanner

```bash
# Scan a directory
go run main.go scan --path /path/to/your/project

# Output CBOM to a file
go run main.go scan --path /path/to/your/project --output cbom.json

# Run as a CI gate (exits non-zero on CRITICAL findings)
go run main.go gate --path /path/to/your/project
```

---

## Adding a New Algorithm

All algorithm definitions live in `pkg/lsdb/standards.go`. Each entry maps a legacy algorithm to its QES score, risk tier, and NIST replacement.

```go
// Example: adding a new entry
{
    Name:            "MyAlgorithm",
    OID:             "1.2.3.4.5",
    QuantumRisk:     "Quantum-Vulnerable (HNDL Risk)",
    QES:             1.0,
    NISTReplacement: "FIPS 203 — ML-KEM (CRYSTALS-Kyber)",
    FIPS:            "FIPS 203",
},
```

After adding an entry, add a corresponding test case to the scanner and verify it is detected in `examples/legacy-app/`.

---

## Adding a New Language

1. Create `pkg/scanner/<language>.go`
2. Implement a `Scan(path string) ([]Finding, error)` function
3. Register the scanner in `main.go` alongside the existing Go/Python/Java scanners
4. Add example files with intentional vulnerabilities to `examples/legacy-app/`
5. Verify findings appear in the CBOM output

---

## Submitting a Pull Request

1. Fork the repository and create a feature branch from `main`
2. Make your changes with clear, descriptive commits
3. Ensure `go test ./...` passes
4. Ensure `go vet ./...` passes with no warnings
5. Open a pull request — the GitHub Actions PQC audit gate will run automatically
6. Describe what cryptographic risk your change addresses

---

## Code Standards

- **No external dependencies** — Go standard library only
- **No global state** — all scanner functions are pure and stateless
- **Table-driven tests** — all new detection rules must include test cases
- **Comments in plain English** — assume the reader is a security engineer, not a Go expert

---

*Questions? Open a GitHub Discussion or file an issue.*
