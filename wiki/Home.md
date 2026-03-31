# PQC-Atlas

> **Automated Cryptographic Discovery & Observability Engine**
> *Find every quantum-vulnerable algorithm in your codebase — before a quantum computer finds it for you.*

---

[![Go 1.21+](https://img.shields.io/badge/Go-1.21+-00ADD8?style=flat-square&logo=go&logoColor=white)](https://golang.org/)
[![NIST FIPS 203/204](https://img.shields.io/badge/NIST-FIPS%20203%2F204-0057A8?style=flat-square)](https://csrc.nist.gov/projects/post-quantum-cryptography)
[![CycloneDX 1.7](https://img.shields.io/badge/CycloneDX-1.7-6B46C1?style=flat-square)](https://cyclonedx.org/)
[![Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-22C55E?style=flat-square)](../blob/main/LICENSE)
[![CNSA 2.0](https://img.shields.io/badge/Mandate-NSM--10%20%7C%20CNSA%202.0-EF4444?style=flat-square)]()

---

## What Is PQC-Atlas?

PQC-Atlas is an open-source static analysis and cryptographic observability engine built in Go. It scans codebases written in **Go, Python, and Java**, identifies every quantum-vulnerable cryptographic algorithm in use, scores each finding by HNDL risk severity, and generates a **CycloneDX 1.7 Cryptographic Bill of Materials (CBOM)** — a machine-readable inventory that maps each finding to its NIST post-quantum replacement.

It runs in milliseconds. It requires no code execution. It integrates directly into your CI/CD pipeline.

---

## The Threat in One Sentence

> Nation-state adversaries are collecting your encrypted data today and waiting for a quantum computer to decrypt it. This is called **Harvest Now, Decrypt Later (HNDL)**. The US government has mandated full migration to quantum-safe cryptography by **2030** under CNSA 2.0.

---

## Navigate the Wiki

| Page | For Whom | What You Will Learn |
|------|----------|---------------------|
| [Quick Start](Quick-Start) | Everyone | Scan your first codebase in under 5 minutes |
| [Architecture](Architecture) | Engineers | How the scanner, scoring engine, and CBOM generator work |
| [Risk Taxonomy](Risk-Taxonomy) | Security & Compliance | The three risk tiers, QES scoring, and decision matrix |
| [CI/CD Integration](CI-CD-Integration) | DevSecOps | GitHub Actions gate setup and configuration |
| [Glossary](Glossary) | Everyone | Every acronym and term used in plain English |
| [Executive Brief](Executive-Brief) | C-Suite & Board | 5-minute non-technical summary of the problem and solution |
| [Roadmap](Roadmap) | Stakeholders | Current capabilities and planned milestones through v2.0 |
| [Contributing](Contributing) | Open Source Contributors | How to add algorithms, languages, and integrations |
| [Security Policy](Security-Policy) | Security Researchers | Responsible disclosure and scope |

---

## Live Demo — 17 Findings in 3.51ms

```
$ go run main.go scan --path examples/legacy-app/

[go]     main.go:15     RSA-Legacy-2048   CRITICAL  QES:1.00  → FIPS 203 ML-KEM
[go]     main.go:24     ECDSA-Legacy      CRITICAL  QES:0.95  → FIPS 204 ML-DSA
[python] auth.py:13     RSA-Legacy        CRITICAL  QES:1.00  → FIPS 203 ML-KEM
[python] auth.py:21     ECC-Legacy        CRITICAL  QES:0.95  → FIPS 204 ML-DSA
[java]   Token.java:16  RSA-Legacy        CRITICAL  QES:1.00  → FIPS 203 ML-KEM
[java]   Token.java:24  ECC-Legacy        CRITICAL  QES:0.95  → FIPS 204 ML-DSA
...

[+] Scan Complete — 17 findings in 3.51ms
[+] CBOM written to cbom.json (CycloneDX 1.7)
```

---

## Key Numbers

| Metric | Value |
|--------|-------|
| Scan time (full microservice) | 3.51ms |
| Findings detected (demo app) | 17 |
| Languages supported | Go, Python, Java |
| Algorithms detected | RSA, ECC, DSA, ECDSA, MD5, SHA-1, DES |
| NIST standards mapped | FIPS 203, 204, 205, 202 |
| External dependencies | Zero |
| License | Apache 2.0 |

---

## Innovators

**Sai Sravan Cherukuri** & **Sai Saketh Cherukuri**

*Built to protect the infrastructure of tomorrow — starting with the code of today.*
