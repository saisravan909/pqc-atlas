# PQC-Atlas

> A specialized static analysis and observability framework that solves **Cryptographic Blindness** — automating the discovery of quantum-vulnerable cryptographic algorithms and generating a standardized migration path to Post-Quantum Cryptography (PQC).

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
Status: Flagged as Quantum-Vulnerable
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

## Standards Compliance

PQC-Atlas maps findings to the latest NIST Post-Quantum Cryptography standards:

| Legacy Algorithm | Vulnerability | NIST Replacement |
|---|---|---|
| RSA-2048 / RSA-4096 | Broken by Shor's Algorithm | FIPS 204 — ML-DSA (CRYSTALS-Dilithium) |
| ECDSA / ECDH | Broken by Shor's Algorithm | FIPS 204 — ML-DSA / FIPS 203 — ML-KEM |
| AES-128 | Weakened by Grover's Algorithm | AES-256 (symmetric uplift) |

---

## CI/CD Integration

PQC-Atlas can be used as a compliance gate in any pipeline:

```yaml
# Example: GitHub Actions
- name: PQC Compliance Scan
  run: pqc-atlas scan --path . --fail-on-violation
```

If a non-compliant algorithm is detected, the build fails with a detailed report of the violation and its recommended fix.

---

## Output Format

Results are exported as a **CycloneDX 1.7** compliant CBOM JSON, compatible with:

- Federal GRC platforms (FedRAMP, CMMC)
- Enterprise risk management tools
- Software composition analysis (SCA) pipelines

---

## Tech Stack

- **Runtime:** Node.js 24
- **Language:** TypeScript 5.9
- **API:** Express 5
- **Database:** PostgreSQL + Drizzle ORM
- **Validation:** Zod
- **Package Manager:** pnpm (monorepo)

---

## Author

**Sai Sravan Cherukuri**

---

## License

MIT
