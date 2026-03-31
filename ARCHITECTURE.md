# PQC-Atlas: System Architecture

## Overview

PQC-Atlas is built on a **"Discovery-First"** philosophy. It uses static analysis to map cryptographic dependencies without requiring the code to be executed, ensuring a secure and **"Zero-Touch"** audit process.

---

## 1. The AST Discovery Engine

Instead of basic text searches, PQC-Atlas utilizes **Abstract Syntax Tree (AST)** parsing.

- **The Benefit:** It understands the structure of the code. It can tell the difference between a variable named `rsa` and an actual call to a vulnerable `crypto/rsa` library.
- **How it works:** The engine calls `go/parser` to build a full AST of each source file, then walks every node looking for `CallExpr` nodes whose selector matches known vulnerable import paths — cross-referenced against the file's actual import declarations.

---

## 2. Lattice Signature Database (LSDB)

Every discovered primitive is compared against our internal **LSDB**. This database contains the mapping between legacy OIDs (Object Identifiers) and their modern, NIST-approved PQC counterparts (ML-KEM and ML-DSA).

| Legacy OID | Algorithm | NIST Replacement |
|---|---|---|
| `1.2.840.113549.1.1.1` | RSA | FIPS 204 — ML-DSA |
| `1.2.840.10045.2.1` | EC (P-256 / P-384) | FIPS 203 — ML-KEM |
| `1.2.840.10040.4.1` | DSA | FIPS 204 — ML-DSA |
| `1.3.14.3.2.26` | SHA-1 | FIPS 205 — SLH-DSA |

---

## 3. CBOM Synthesis (CycloneDX 1.7)

The final stage is the generation of the **Cryptographic Bill of Materials**. PQC-Atlas strictly serializes findings into the CycloneDX 1.7 schema — the federal standard for cryptographic asset inventories — enabling direct ingestion by GRC platforms and federal compliance toolchains.

Each CBOM component includes:
- Algorithm name and parameter set (e.g. RSA-2048)
- Execution environment and implementation platform
- Quantum Exposure Score (QES)
- Recommended NIST PQC replacement

---

## 4. Quantum Exposure Score (QES)

Risk is quantified using the formula:

```
QES = (A_w × E_f) + T_d
```

| Variable | Description |
|---|---|
| `A_w` | Algorithm weight — inherent quantum vulnerability of the primitive |
| `E_f` | Exposure factor — criticality and accessibility of the code path |
| `T_d` | Time decay — urgency weighting based on NIST migration timeline |

---

## 5. CI/CD Policy Gate

The `policy` package implements a configurable compliance gate. When integrated into a pipeline, it evaluates all findings against a `ViolationPolicy` (Default or Strict) and returns a pass/fail signal — blocking non-compliant code from merging.
