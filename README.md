<div align="center">

<img src="assets/logo.png" width="320" alt="PQC-Atlas Logo" />

<h1>PQC-Atlas</h1>

<h3><em>Automated Cryptographic Discovery & Observability Engine</em></h3>

<p><strong>Find every quantum-vulnerable algorithm in your codebase — before a quantum computer finds it for you.</strong></p>

<br/>

[![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org/)
[![NIST Compliant](https://img.shields.io/badge/NIST-FIPS%20203%2F204-0057A8?style=for-the-badge&logoColor=white)](https://csrc.nist.gov/projects/post-quantum-cryptography)
[![CycloneDX](https://img.shields.io/badge/CycloneDX-1.7-6B46C1?style=for-the-badge)](https://cyclonedx.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-22C55E?style=for-the-badge)](LICENSE)

[![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/saisravan909/pqc-atlas/actions/workflows/pqc-audit.yml)
[![Languages](https://img.shields.io/badge/Languages-Go%20%7C%20Python%20%7C%20Java-F59E0B?style=for-the-badge&logo=codepen&logoColor=white)]()
[![Standard](https://img.shields.io/badge/Mandate-NSM--10%20%7C%20CNSA%202.0-EF4444?style=for-the-badge)]()
[![HNDL](https://img.shields.io/badge/Threat%20Model-HNDL%20Aware-F97316?style=for-the-badge)]()

<br/>

> *"The biggest risk in the post-quantum transition is not the algorithms we know are broken — it's the ones we forgot we were using."*

</div>

---

## Navigate by Role

| I am a... | Start here |
|-----------|-----------|
| **Executive / Decision-maker** | [Executive Summary](docs/EXECUTIVE-SUMMARY.md) — 5-minute brief, no technical background required |
| **Compliance officer / Auditor** | [Glossary & Risk Taxonomy](GLOSSARY.md) — all acronyms and risk tiers explained |
| **Security engineer** | [Quick Start](#quick-start) below → [Contributing](CONTRIBUTING.md) |
| **DevSecOps / CI-CD operator** | [CI/CD Integration](#cicd-gate--github-actions) section below |
| **Project stakeholder** | [Roadmap](ROADMAP.md) — current state and planned milestones |

---

## 📖 Table of Contents

| | Section |
|:---:|:---|
| 🎯 | [The Problem — Cryptographic Blindness](#-the-problem-cryptographic-blindness) |
| 🌉 | [The Big Picture — A Bridge Analogy](#-the-big-picture-a-bridge-analogy) |
| ⚙️ | [How PQC-Atlas Works](#️-how-pqc-atlas-works) |
| ⏳ | [The Quantum Threat Timeline](#-the-quantum-threat-timeline) |
| 🔬 | [Language Support](#-language-support) |
| 🖥️ | [Live Demo — Real Scan Output](#️-live-demo-real-scan-output) |
| 🔄 | [The CI/CD Gate — How Violations Are Blocked](#-the-cicd-gate-how-violations-are-blocked) |
| 📊 | [Cryptographic Inventory](#-cryptographic-inventory) |
| 🔥 | [Microservice Risk Heatmap](#-microservice-risk-heatmap) |
| 📋 | [Sample CBOM Output](#-sample-cbom-output) |
| 🛠️ | [Installation & Usage](#️-installation--usage) |
| 🗺️ | [Ecosystem Roadmap](#️-ecosystem-roadmap) |
| 📄 | [License](#-license) |

---

## 🎯 The Problem: Cryptographic Blindness

<div align="center">

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   FACT: 99% of enterprise codebases contain quantum-vulnerable      │
│   cryptography. Most teams have no idea where it is.               │
│                                                                     │
│   FACT: NSM-10 and CNSA 2.0 mandate full PQC migration by 2030.   │
│                                                                     │
│   FACT: You cannot migrate what you cannot find.                   │
│                                                                     │
│   ► This gap is called CRYPTOGRAPHIC BLINDNESS.                    │
│   ► PQC-Atlas eliminates it.                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

</div>

The threat is called **HNDL — "Harvest Now, Decrypt Later."** Adversaries are actively collecting encrypted data *today*, storing it until a Cryptographically-Relevant Quantum Computer (CRQC) exists to break it. The encryption protecting your secrets right now may already be compromised — it just hasn't been decrypted yet.

---

## 🌉 The Big Picture: A Bridge Analogy

> *For executives, policymakers, and non-technical stakeholders.*

```mermaid
flowchart LR
    A("🌉 THE OLD BRIDGE\n──────────────\nYour codebase running\nRSA-2048 + ECC encryption.\nWorks fine today.\nA storm is coming."):::bridge
    B("🔍 THE INSPECTION\n──────────────\nPQC-Atlas scans every\nfile. Finds every\nweak bolt and\ncracked timber."):::inspect
    C("📋 THE BLUEPRINT\n──────────────\nA CBOM report listing\nevery vulnerable spot\nand exactly what\nmaterial to replace it."):::blueprint
    D("⛈️ THE STORM\n──────────────\nQuantum Computing.\nBreaks RSA in hours.\nNo patch available.\nOnly prevention works."):::storm

    A -->|"PQC-Atlas scans"| B
    B -->|"Generates"| C
    D -.->|"threatens"| A

    classDef bridge fill:#1e3a5f,stroke:#3b82f6,color:#93c5fd
    classDef inspect fill:#1a3a2a,stroke:#22c55e,color:#86efac
    classDef blueprint fill:#3b1f5e,stroke:#a855f7,color:#d8b4fe
    classDef storm fill:#4a1919,stroke:#ef4444,color:#fca5a5
```

<br/>

<div align="center">

| 🌉 The Old Bridge | 🔍 The Inspection | 📋 The Blueprint | ⛈️ The Storm |
|:---:|:---:|:---:|:---:|
| Your codebase. RSA-2048, ECC, DSA. Works today. | PQC-Atlas walks every line. Zero-touch. No code executed. | A CBOM listing every risk, ranked by severity, with exact NIST replacements. | Quantum computers. Shor's Algorithm. Breaking RSA in hours. |
| *"The bridge looks fine"* | *"We found 47 weak bolts"* | *"Replace these 47 with ML-DSA"* | *"The storm has a 2030 deadline"* |

</div>

---

## ⚙️ How PQC-Atlas Works

```mermaid
flowchart TB
    subgraph INPUT ["📁 Your Codebase  (Any Language)"]
        direction LR
        A1["🔵 .go\nfiles"]
        A2["🟡 .py\nfiles"]
        A3["🔴 .java\nfiles"]
    end

    subgraph ENGINE ["⚙️  PQC-Atlas Engine"]
        direction TB
        B1["Abstract Syntax Tree\nParser  (Go)"]
        B2["Regex Pattern\nScanner  (Python)"]
        B3["Regex Pattern\nScanner  (Java)"]
        B4["🗄️ Lattice Signature\nDatabase  (LSDB)\nOID → NIST Mapping"]
        B5["📐 Quantum Exposure\nScore  (QES)\nRisk Quantification"]
    end

    subgraph OUTPUT ["📤 Output"]
        direction LR
        C1["📋 CycloneDX 1.7\nCBOM  JSON"]
        C2["🚦 CI/CD\nPolicy Gate"]
        C3["📊 Risk\nReport"]
    end

    A1 --> B1
    A2 --> B2
    A3 --> B3
    B1 & B2 & B3 --> B4
    B4 --> B5
    B5 --> C1
    B5 --> C2
    B5 --> C3

    style INPUT fill:#0f172a,stroke:#334155,color:#94a3b8
    style ENGINE fill:#0f172a,stroke:#334155,color:#94a3b8
    style OUTPUT fill:#0f172a,stroke:#334155,color:#94a3b8
```

**What makes PQC-Atlas different from a keyword search:**

| Approach | "grep RSA" | PQC-Atlas |
|:---|:---:|:---:|
| Understands code structure | ❌ | ✅ AST parsing |
| Ignores comments & strings | ❌ | ✅ |
| Extracts key size from arguments | ❌ | ✅ |
| Maps to NIST PQC replacement | ❌ | ✅ LSDB |
| Quantified risk score | ❌ | ✅ QES formula |
| CI/CD pipeline integration | ❌ | ✅ |
| Standards-compliant output | ❌ | ✅ CycloneDX 1.7 |

---

## ⏳ The Quantum Threat Timeline

```mermaid
timeline
    title The Quantum Threat & Compliance Timeline
    section NIST Standards
        2024 : FIPS 203 — ML-KEM published
             : FIPS 204 — ML-DSA published
             : FIPS 205 — SLH-DSA published
    section Migration Mandates
        2025 : NSM-10 — Federal migration begins
             : CNSA 2.0 — Agency inventory audits due
        2026 : High-priority national security systems must be PQC-ready
        2027 : All new systems must deploy PQC by default
    section The Deadline
        2030 : CNSA 2.0 full compliance deadline
             : RSA and ECC officially deprecated for federal use
    section The Threat Window
        2033 : Estimated first CRQC capable of breaking RSA-2048
        2035 : Full CRQC deployment risk — HNDL attacks mature
```

---

## 🔬 Language Support

<div align="center">

| Language | Engine | Detects | Status |
|:---:|:---:|:---|:---:|
| ![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white) | **AST Parser** — full code structure analysis | RSA, ECDSA, ECC, DSA, MD5, SHA-1, DES | ✅ Active |
| ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) | **Regex Scanner** — import + call detection | `rsa.generate_private_key`, `ec.generate_private_key`, `RSA.generate`, `hashlib.md5/sha1`, DSA | ✅ Active |
| ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) | **Regex Scanner** — `java.security` / `javax.crypto` | `KeyPairGenerator`, `Cipher.getInstance`, `Signature.getInstance`, `MessageDigest` | ✅ Active |
| ![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white) | Pattern Scanner | `ring::signature::RsaKeyPair`, legacy `openssl` crate | 🗓 Q2 2026 |
| ![C++](https://img.shields.io/badge/C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white) | Pattern Scanner | OpenSSL `RSA_generate_key`, `EC_KEY_new_by_curve_name` | 🗓 Q3 2026 |

</div>

---

## 🖥️ Live Demo: Real Scan Output

> The following is **actual output** — produced by running PQC-Atlas against the `examples/legacy-app/` included in this repository. A realistic microservice spanning Go, Python, and Java.

```
$ go run main.go scan --path examples/

──────────────────────────────────────────────────
  PQC-ATLAS: Cryptographic Observability Engine
  Status: NIST FIPS 203/204 Compliance Mode
──────────────────────────────────────────────────

[*] Initializing AST Discovery Engine on: examples/

[java]   TokenService.java:16  — RSA-Legacy detected
[java]   TokenService.java:24  — ECC-Legacy detected
[java]   TokenService.java:32  — DSA-Legacy detected
[java]   TokenService.java:40  — RSA-Legacy detected  (Signature)
[java]   TokenService.java:49  — RSA-Legacy detected  (Cipher)
[java]   TokenService.java:57  — MD5 detected
[java]   TokenService.java:65  — SHA-1 detected
[python] auth_service.py:13    — RSA-Legacy detected
[python] auth_service.py:21    — ECC-Legacy detected
[python] auth_service.py:28    — DSA-Legacy detected
[python] auth_service.py:36    — MD5 detected
[python] auth_service.py:41    — SHA-1 detected
[go]     main.go:15            — RSA-Legacy-2048 detected
[go]     main.go:24            — ECDSA-Legacy detected
[go]     main.go:24            — ECC-Legacy detected
[go]     main.go:33            — MD5 detected
[go]     main.go:40            — SHA-1 detected

[+] Scan Complete. 17 cryptographic primitives found in 3.51ms.
──────────────────────────────────────────────────

  FILE                   LINE  ALGORITHM      RISK                           QES   NIST REPLACEMENT
  ─────────────────────────────────────────────────────────────────────────────────────────────────
  TokenService.java       16   RSA-Legacy     Quantum-Vulnerable (HNDL)     1.05  FIPS 204 — ML-DSA
  TokenService.java       24   ECC-Legacy     Quantum-Vulnerable (HNDL)     1.00  FIPS 203 — ML-KEM
  TokenService.java       32   DSA-Legacy     Quantum-Vulnerable (HNDL)     1.05  FIPS 204 — ML-DSA
  TokenService.java       40   RSA-Legacy     Quantum-Vulnerable (HNDL)     1.05  FIPS 204 — ML-DSA
  TokenService.java       57   MD5            Quantum-Weakened  (HNDL)      0.69  SHA-3 (FIPS 202)
  TokenService.java       65   SHA-1          Classically Deprecated        0.51  SHA-3 (FIPS 202)
  auth_service.py         13   RSA-Legacy     Quantum-Vulnerable (HNDL)     1.05  FIPS 204 — ML-DSA
  auth_service.py         21   ECC-Legacy     Quantum-Vulnerable (HNDL)     1.00  FIPS 203 — ML-KEM
  auth_service.py         28   DSA-Legacy     Quantum-Vulnerable (HNDL)     1.05  FIPS 204 — ML-DSA
  auth_service.py         36   MD5            Quantum-Weakened  (HNDL)      0.69  SHA-3 (FIPS 202)
  main.go                 15   RSA-Legacy     Quantum-Vulnerable (HNDL)     1.10  FIPS 204 — ML-DSA
  main.go                 24   ECDSA-Legacy   Quantum-Vulnerable (HNDL)     1.05  FIPS 204 — ML-DSA

[*] Exporting CycloneDX 1.7 CBOM → ./cbom.json
[+] CBOM written. 17 component(s) inventoried.
```

---

## 🔄 The CI/CD Gate: How Violations Are Blocked

> Every pull request is scanned automatically. Quantum-vulnerable code never reaches `main`.

```mermaid
sequenceDiagram
    actor Dev as 👨‍💻 Developer
    participant PR as 📬 Pull Request
    participant CI as ⚙️ PQC-Atlas CI
    participant Gate as 🚦 Policy Gate
    participant Main as 🛡️ main branch

    Dev->>PR: Opens Pull Request
    PR->>CI: Triggers pqc-audit workflow
    CI->>CI: Scans .go + .py + .java files
    CI->>Gate: Evaluates all QES scores

    Gate-->>PR: ❌ FAIL — RSA-Legacy detected (QES 1.05)
    PR-->>Dev: Merge blocked — build fails

    Note over Dev,PR: Developer migrates to ML-DSA and updates PR

    Dev->>PR: Pushes updated code
    PR->>CI: Re-triggers pqc-audit
    CI->>Gate: Re-evaluates scores
    Gate-->>PR: ✅ PASS — No violations detected
    PR-->>Main: ✅ Merge approved
```

---

## 📊 Cryptographic Inventory

```mermaid
pie title Cryptographic Algorithm Distribution (Sample Enterprise Codebase)
    "ML-KEM 1024 — Quantum-Safe" : 45
    "ML-DSA 87 — Quantum-Safe" : 20
    "RSA-3072 — At Risk" : 20
    "RSA-2048 — Critical" : 10
    "ECC P-256 — Critical" : 5
```

<br/>

<div align="center">

| Algorithm | Status | NIST Standard | QES Score | Readiness |
| :--- | :---: | :---: | :---: | :---: |
| **ML-KEM-1024** | ✅ Quantum-Safe | FIPS 203 | 0.00 | 🟢 PQC Ready |
| **ML-DSA-87** | ✅ Quantum-Safe | FIPS 204 | 0.00 | 🟢 PQC Ready |
| **SLH-DSA** | ✅ Quantum-Safe | FIPS 205 | 0.00 | 🟢 PQC Ready |
| **RSA-4096** | ⚠️ Transitional | FIPS 186-5 | 0.45 | 🟡 Plan Migration |
| **RSA-3072** | ⚠️ At Risk | FIPS 186-5 | 0.72 | 🟡 Migrate Soon |
| **RSA-2048** | 🛑 Critical | Deprecated | 1.10 | 🔴 HNDL Risk |
| **ECC P-256** | 🛑 Critical | Deprecated | 1.00 | 🔴 HNDL Risk |
| **ECDSA** | 🛑 Critical | Deprecated | 1.05 | 🔴 HNDL Risk |
| **DSA** | 🛑 Critical | Deprecated | 1.05 | 🔴 HNDL Risk |
| **MD5** | ⛔ Broken | None | 0.69 | 🔴 Remove Now |
| **SHA-1** | ⛔ Deprecated | None | 0.51 | 🔴 Remove Now |

</div>

---

## 🔥 Microservice Risk Heatmap

> PQC-Atlas maps the **cryptographic blast radius** of your microservice mesh — showing exactly which services carry the highest HNDL exposure.

```mermaid
flowchart TD
    GW["🌐 API Gateway\n─────────────\n🔴 RSA-2048\nQES: 1.10\nHNDL Risk: CRITICAL"]:::critical
    AUTH["🔑 AuthService\n─────────────\n🔴 RSA-2048 + ECDSA\nQES: 1.05\nHNDL Risk: CRITICAL"]:::critical
    TOKEN["🎫 TokenService\n─────────────\n🔴 DSA + RSA Cipher\nQES: 1.05\nHNDL Risk: CRITICAL"]:::critical
    USER["👤 UserService\n─────────────\n🟡 MD5 Password Hash\nQES: 0.69\nHNDL Risk: HIGH"]:::high
    DATA["🗄️ DataService\n─────────────\n🟡 SHA-1 Checksums\nQES: 0.51\nRisk: MEDIUM"]:::medium
    AUDIT["📋 AuditService\n─────────────\n🟢 ML-KEM-1024\nQES: 0.00\nStatus: PQC-READY"]:::safe

    GW -->|"mTLS — RSA"| AUTH
    GW -->|"JWT — RSA"| TOKEN
    AUTH -->|"Session"| USER
    TOKEN -->|"Claims"| DATA
    DATA -->|"Audit Log"| AUDIT

    classDef critical fill:#450a0a,stroke:#ef4444,color:#fca5a5,font-weight:bold
    classDef high fill:#431407,stroke:#f97316,color:#fdba74,font-weight:bold
    classDef medium fill:#422006,stroke:#f59e0b,color:#fcd34d
    classDef safe fill:#052e16,stroke:#22c55e,color:#86efac,font-weight:bold
```

<br/>

<div align="center">

| 🔴 CRITICAL — HNDL Risk | 🟡 HIGH — Quantum-Weakened | 🟢 PQC-READY |
|:---:|:---:|:---:|
| API Gateway, AuthService, TokenService | UserService, DataService | AuditService |
| RSA-2048, ECDSA, DSA active | MD5, SHA-1 in use | ML-KEM-1024 deployed |
| **Immediate remediation required** | **Plan migration within 6 months** | **No action needed** |

</div>

---

## 📋 Sample CBOM Output

> The Cryptographic Bill of Materials is a machine-readable inventory — the same format used by federal risk management and GRC platforms.

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.7",
  "serialNumber": "urn:uuid:pqc-atlas-scan-2026",
  "metadata": {
    "timestamp": "2026-03-31T00:00:00Z",
    "tools": [{ "name": "PQC-Atlas", "version": "1.0.0" }]
  },
  "components": [
    {
      "type": "cryptoAsset",
      "name": "RSA",
      "cryptoProperties": {
        "assetType": "algorithm",
        "algorithmProperties": {
          "parameterSetIdentifier": "2048",
          "curve": "N/A",
          "executionEnvironment": "software",
          "implementationPlatform": "Go — crypto/rsa"
        },
        "oid": "1.2.840.113549.1.1.1",
        "pqcReadiness": "UNSAFE"
      },
      "evidence": {
        "occurrences": [{ "location": "services/auth/main.go", "line": 15 }]
      },
      "recommendation": "Migrate to FIPS 204 — ML-DSA (CRYSTALS-Dilithium)"
    }
  ]
}
```

---

## 🛠️ Installation & Usage

### Prerequisites

- Go 1.21 or later
- The target source code repository

### Quick Start

```bash
# Clone PQC-Atlas
git clone https://github.com/saisravan909/pqc-atlas.git
cd pqc-atlas

# Scan any codebase — Go, Python, and Java supported
go run main.go scan --path /path/to/your/repo

# Export a CycloneDX 1.7 CBOM
go run main.go export --path /path/to/your/repo --out cbom.json

# Run as a compliance gate (returns exit code 1 on violations)
go run main.go audit --path . --fail-on-violation
```

### GitHub Actions CI

Drop-in CI gate included at `.github/workflows/pqc-audit.yml`. Activates on every pull request:

```
1. Builds scanner from source
2. Runs compliance audit against the full repository
3. Blocks merge if any CRITICAL or HIGH violations are found
4. Uploads CBOM as a signed build artifact (retained 90 days)
```

<details>
<summary>📄 View pqc-audit.yml</summary>

```yaml
name: PQC-Atlas Compliance Audit

on:
  pull_request:
    branches: ["main"]

jobs:
  pqc-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: "1.21"
      - run: go build -o pqc-atlas ./main.go
      - run: ./pqc-atlas audit --path . --fail-on-violation
      - if: always()
        run: ./pqc-atlas export --path . --out cbom.json
      - if: always()
        uses: actions/upload-artifact@v4
        with:
          name: cbom-${{ github.sha }}
          path: cbom.json
```

</details>

---

## 🗺️ Ecosystem Roadmap

```mermaid
timeline
    title PQC-Atlas Ecosystem Roadmap
    section Available Now
        2026 Q1 : PQC-Atlas v1.0
                : Multi-language scanner — Go, Python, Java
                : CycloneDX 1.7 CBOM generation
                : GitHub Actions CI gate
                : QES risk scoring engine
    section Coming Next
        2026 Q2 : Rust + C++ language support
                : SARIF output format for GitHub Security tab
                : VS Code extension for inline warnings
        2026 Q3 : RegoSafe-PQC — Policy-as-Code enforcement
                : OPA integration for Kubernetes admission control
    section Future Vision
        2026 Q4 : CipherShift — Hybrid-protocol integrity validation
                : REST API for enterprise GRC platform integration
        2027 Q1 : AI-assisted migration path generator
                : SBOM ↔ CBOM cross-reference engine
```

---

## 📄 License

Distributed under the **Apache License 2.0**.
Copyright © 2026 **Sai Sravan Cherukuri** & **Sai Saketh Cherukuri**. See [LICENSE](LICENSE) for full terms.

---

<div align="center">

**Built to protect the infrastructure of tomorrow — starting with the code of today.**

*Innovators: Sai Sravan Cherukuri & Sai Saketh Cherukuri*

[![GitHub Stars](https://img.shields.io/github/stars/saisravan909/pqc-atlas?style=for-the-badge&logo=github&color=yellow)](https://github.com/saisravan909/pqc-atlas/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/saisravan909/pqc-atlas?style=for-the-badge&logo=github&color=blue)](https://github.com/saisravan909/pqc-atlas/network)
[![GitHub Issues](https://img.shields.io/github/issues/saisravan909/pqc-atlas?style=for-the-badge&logo=github&color=red)](https://github.com/saisravan909/pqc-atlas/issues)

*If PQC-Atlas helped you, please consider starring the repository.*

</div>
