<div align="center">

<img src="logo.png" alt="PQC-Atlas Logo" width="200"/>

# PQC-Atlas

### Cryptographic Observability Engine

[![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org/)
[![NIST Compliant](https://img.shields.io/badge/NIST-FIPS%20203%2F204-0057A8?style=for-the-badge&logo=nist&logoColor=white)](https://csrc.nist.gov/projects/post-quantum-cryptography)
[![CycloneDX](https://img.shields.io/badge/CycloneDX-1.7-6B46C1?style=for-the-badge)](https://cyclonedx.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=for-the-badge)]()
[![Standard](https://img.shields.io/badge/PQC%20Ready-ML--KEM%20%7C%20ML--DSA-blueviolet?style=for-the-badge)]()

> A specialized static analysis and observability framework that solves **Cryptographic Blindness** — automating the discovery of quantum-vulnerable cryptographic algorithms and generating a standardized migration path to Post-Quantum Cryptography (PQC).

</div>

---

## Overview

PQC-Atlas scans your codebase for legacy cryptographic algorithms (RSA, ECC) and produces a **Cryptographic Bill of Materials (CBOM)** — a complete inventory of every cryptographic primitive in use, its quantum risk level, and its recommended NIST-approved replacement.

---

## What PQC-Atlas Does

| Capability | Description |
|---|---|
| **Multi-Language AST Discovery** | Parses Abstract Syntax Trees to identify real cryptographic calls, ignoring dead code and comments |
| **Standards Mapping** | Cross-references every primitive against the Lattice Signature Database (LSDB), mapping legacy OIDs to NIST FIPS 203 and FIPS 204 |
| **Compliance Gating** | Acts as a CI/CD quality gate — blocks commits that introduce non-compliant algorithms (e.g. RSA-2048) |
| **Standardized Export** | Produces CycloneDX 1.7 compliant JSON output, integrating with federal and enterprise GRC platforms |

---

## How It Works

When you run `pqc-atlas scan --path .`, the engine executes a four-stage pipeline:

### Stage 1 — Lexical Analysis & Parsing

The tool builds a mathematical model of your code (AST). This means it understands that `keySize := 2048` inside a `crypto/rsa` function is a high-risk vulnerability, while the same text in a `README.md` is harmless.

### Stage 2 — Signature Matching

The engine compares identified code nodes against the LSDB:

```
Input:  CallExpr → GenerateKey with RSA
Lookup: Does this match a legacy OID? → Yes
Status: Flagged as Quantum-Vulnerable (HNDL Risk)
```

### Stage 3 — Risk Calculation (QES)

Every finding is scored using the **Quantum Exposure Score** formula:

$$QES = (A_w \times E_f) + T_d$$

| Variable | Meaning |
|---|---|
| `A_w` | Algorithm weight (severity of the primitive's quantum vulnerability) |
| `E_f` | Exposure factor (how publicly accessible or critical the code path is) |
| `T_d` | Time decay (urgency based on NIST migration timeline) |

### Stage 4 — Report Generation

Outputs a **CBOM** in CycloneDX 1.7 JSON format, listing every cryptographic primitive found, its QES score, and its recommended PQC replacement standard.

---

## Legacy Crypto "Heatmap"

PQC-Atlas identifies **Hot Spots** within a microservice mesh by analyzing the concentration of deprecated algorithms. By mapping service-to-service communication, the framework flags high-traffic nodes still relying on legacy RSA or ECC primitives. This allows security teams to prioritize remediation efforts on the most vulnerable entry points in the infrastructure.

```
 Microservice Mesh — Cryptographic Risk Heat Map
 ─────────────────────────────────────────────────────
  [ API Gateway ]  ──────►  [ AuthService  ]  ◄── RSA-2048  🔴 CRITICAL
       │                          │
       ▼                          ▼
  [ UserService ]  ──────►  [ TokenService ]  ◄── ECDSA-256 🔴 CRITICAL
       │                          │
       ▼                          ▼
  [ DataService ]  ──────►  [ AuditService ]  ◄── ML-KEM    🟢 PQC-READY
 ─────────────────────────────────────────────────────
  Legend:  🔴 HNDL Risk (Harvest Now, Decrypt Later)
           🟡 Quantum-Weakened
           🟢 NIST PQC Compliant
```

---

## Standards Compliance

PQC-Atlas maps findings to the latest NIST Post-Quantum Cryptography standards:

| Legacy Algorithm | Vulnerability | NIST Replacement |
|---|---|---|
| RSA-2048 / RSA-4096 | Broken by Shor's Algorithm | FIPS 204 — ML-DSA (CRYSTALS-Dilithium) |
| ECDSA / ECDH | Broken by Shor's Algorithm | FIPS 204 — ML-DSA / FIPS 203 — ML-KEM |
| DSA | Broken by Shor's Algorithm | FIPS 204 — ML-DSA (CRYSTALS-Dilithium) |
| MD5 | Classically broken + Grover weakened | SHA-3 (FIPS 202) |
| AES-128 | Weakened by Grover's Algorithm | AES-256 (symmetric uplift) |

---

## Sample CBOM Output

PQC-Atlas exports data in a standardized JSON format, allowing for instant ingestion by federal risk management tools.

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.7",
  "metadata": {
    "timestamp": "2026-03-31T00:00:00Z",
    "tools": [{ "vendor": "Sai Sravan Cherukuri", "name": "pqc-atlas", "version": "0.1.0" }]
  },
  "components": [
    {
      "type": "cryptographic-asset",
      "name": "RSA-Legacy",
      "cryptoProperties": {
        "assetType": "algorithm",
        "algorithmProperties": {
          "primitive": "public-key-encryption",
          "parameterSetIdentifier": "2048",
          "executionEnvironment": "software"
        }
      },
      "properties": [
        { "name": "pqc-atlas:risk",             "value": "Quantum-Vulnerable (HNDL Risk)" },
        { "name": "pqc-atlas:qes",              "value": "1.1000" },
        { "name": "pqc-atlas:nist-replacement", "value": "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)" }
      ]
    }
  ]
}
```

---

## Installation & Usage

### Prerequisites

- Go 1.21+
- A target source code repository

### Quick Start

```bash
# Clone the repository
git clone https://github.com/saisravan909/pqc-atlas.git
cd pqc-atlas

# Run a local scan (table output)
go run main.go scan --path ./examples/legacy-app

# Export a CycloneDX 1.7 CBOM
go run main.go export --path /path/to/your/source --out cbom.json

# Run as a CI/CD compliance gate
go run main.go audit --path . --fail-on-violation
```

### CI/CD Integration

PQC-Atlas can be used as a compliance gate in any pipeline:

```yaml
# GitHub Actions example
- name: PQC Compliance Scan
  run: go run main.go audit --path . --fail-on-violation
```

If a non-compliant algorithm is detected, the build fails with a full report of the violation and its recommended fix.

---

## Project Structure

```
pqc-atlas/
├── main.go                  # CLI entry point (scan, audit, export)
├── go.mod
├── ARCHITECTURE.md
├── pkg/
│   ├── scanner/ast.go       # AST discovery engine
│   ├── cbom/cyclonedx.go    # CycloneDX 1.7 CBOM marshaller
│   ├── lattice/lsdb.go      # Lattice Signature Database (OID → NIST mapping)
│   └── policy/gate.go       # CI/CD compliance gate
└── examples/
    └── legacy-app/main.go   # Sample vulnerable codebase for demo
```

---

## The PQC-Atlas Ecosystem

| Tool | Purpose | Status |
|---|---|---|
| **PQC-Atlas** | Automated Discovery & CBOM Generation | ✅ Active |
| **RegoSafe-PQC** | Policy-as-Code Enforcement | 🗓 Planned Q3 2026 |
| **CipherShift** | Hybrid-Protocol Integrity Validation | 🗓 Planned Q4 2026 |

---

## Author

**Sai Sravan Cherukuri**

---

## License

Distributed under the Apache License 2.0. See [LICENSE](LICENSE) for more information.
