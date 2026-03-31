# Quick Start

> Scan your first codebase for quantum-vulnerable cryptography in under 5 minutes.

---

## Prerequisites

| Requirement | Version | Check |
|-------------|---------|-------|
| Go | 1.21+ | `go version` |
| Git | Any | `git --version` |

No package manager, no Docker, no external dependencies. PQC-Atlas uses Go standard library only.

---

## Step 1 — Clone and Build

```bash
git clone https://github.com/saisravan909/pqc-atlas.git
cd pqc-atlas
go build -o bin/pqc-atlas main.go
```

Verify:
```bash
./bin/pqc-atlas --version
# PQC-Atlas v1.0.0 | NIST FIPS 203/204/205 | CycloneDX 1.7
```

---

## Step 2 — Run Your First Scan

**Scan the included example app:**
```bash
go run main.go scan --path examples/legacy-app/
```

**Scan your own project:**
```bash
go run main.go scan --path /path/to/your/project
```

**Save results as a CBOM file:**
```bash
go run main.go scan --path /path/to/your/project --output cbom.json
```

---

## Step 3 — Read the Output

Each finding shows:

```
[language] file:line  algorithm  severity  QES score  → NIST replacement
```

| Field | Meaning |
|-------|---------|
| `[go]` / `[python]` / `[java]` | Language the finding was detected in |
| `file:line` | Exact location in source code |
| `algorithm` | The vulnerable algorithm name |
| `CRITICAL` / `HIGH` / `MEDIUM` | Risk tier — see [Risk Taxonomy](Risk-Taxonomy) |
| `QES:1.00` | Quantum Exposure Score (0.00–1.10) |
| `→ FIPS 203 ML-KEM` | The NIST-approved replacement algorithm |

---

## Step 4 — Inspect the CBOM

The generated `cbom.json` is a valid **CycloneDX 1.7** Cryptographic Bill of Materials:

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.7",
  "components": [
    {
      "type": "cryptographic-asset",
      "name": "RSA-Legacy-2048",
      "properties": [
        { "name": "pqc-atlas:quantum-risk", "value": "Quantum-Vulnerable (HNDL Risk)" },
        { "name": "pqc-atlas:qes-score",    "value": "1.00" },
        { "name": "pqc-atlas:nist-replacement", "value": "FIPS 203 — ML-KEM (CRYSTALS-Kyber)" },
        { "name": "pqc-atlas:file",         "value": "main.go:15" }
      ]
    }
  ]
}
```

---

## Step 5 — Add the CI Gate

Block quantum-vulnerable code from merging. Copy `.github/workflows/pqc-audit.yml` into your project:

```bash
cp .github/workflows/pqc-audit.yml /your-project/.github/workflows/
```

See [CI/CD Integration](CI-CD-Integration) for full configuration details.

---

## Common Commands

```bash
# Scan a directory
go run main.go scan --path ./src

# Scan and output CBOM
go run main.go scan --path ./src --output cbom.json

# Run as CI gate (exits 1 on CRITICAL findings)
go run main.go gate --path ./src

# Scan only Go files
go run main.go scan --path ./src --lang go
```

---

## What's Next?

- [Architecture](Architecture) — understand how the scanner works under the hood
- [Risk Taxonomy](Risk-Taxonomy) — understand what CRITICAL/HIGH/MEDIUM means
- [CI/CD Integration](CI-CD-Integration) — automate scanning on every pull request
