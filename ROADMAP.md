# PQC-Atlas Roadmap

This document outlines the planned development trajectory for PQC-Atlas. It is written for all audiences — from engineers evaluating contributions to executives assessing strategic fit.

---

## Current State — v1.0 (Available Now)

PQC-Atlas v1.0 is a fully functional cryptographic discovery and observability engine.

| Capability | Status |
|------------|--------|
| Go AST scanning | Live |
| Python regex scanning | Live |
| Java regex scanning | Live |
| Quantum Exposure Scoring (QES) | Live |
| CycloneDX 1.7 CBOM output | Live |
| GitHub Actions CI gate | Live |
| NIST FIPS 203/204/205 replacement mapping | Live |
| NSM-10 / CNSA 2.0 alignment | Live |
| Zero external dependencies | Live |

**Live demo:** `go run main.go scan --path examples/legacy-app/`
Produces 17 findings across Go, Python, and Java in 3.51ms.

---

## Near-Term — v1.1 (Next 90 Days)

> Focus: Broader language coverage and richer output

| Feature | Description | Audience |
|---------|-------------|---------|
| **Rust scanner** | AST-based scanning for Rust codebases | Engineering teams building systems software |
| **C / C++ scanner** | Regex-based scanning for OpenSSL, libgcrypt, and Botan calls | Embedded and systems teams |
| **JavaScript / TypeScript scanner** | Detection of `crypto` module and `node-forge` usage | Full-stack and Node.js teams |
| **SARIF output** | Security results in SARIF format for GitHub Advanced Security and VS Code integration | DevSecOps engineers |
| **Severity filtering flags** | `--min-severity=HIGH` CLI flag to filter output by QES tier | All engineers |
| **HTML report** | Human-readable scan report alongside machine-readable CBOM | Security managers and auditors |

---

## Medium-Term — v1.2 (6 Months)

> Focus: Enterprise integration and compliance automation

| Feature | Description | Audience |
|---------|-------------|---------|
| **GitLab CI integration** | Native `.gitlab-ci.yml` gate template | Teams on GitLab |
| **Jira ticket auto-creation** | Automatically opens a tracked ticket per CRITICAL finding | Security operations teams |
| **Dependency scanning** | Detect quantum-vulnerable cryptography in `go.sum`, `requirements.txt`, and `pom.xml` | Supply chain security teams |
| **Trend tracking** | Compare CBOM snapshots across commits to show cryptographic drift over time | CISOs and compliance officers |
| **Custom rule engine** | Define organization-specific detection rules in YAML | Enterprise security teams |
| **NIST SP 800-235 alignment** | Map findings to NIST's Migration to Post-Quantum Cryptography project guidance | Federal compliance teams |

---

## Long-Term — v2.0 (12 Months)

> Focus: Enterprise-grade cryptographic governance platform

| Feature | Description | Audience |
|---------|-------------|---------|
| **Web dashboard** | Real-time cryptographic inventory across all repositories in an organization | CISOs, security directors |
| **GRC platform connectors** | Direct CBOM export to ServiceNow GRC, Archer, and OneTrust | Compliance and risk teams |
| **Migration playbooks** | Automated, language-specific code transformation suggestions for each finding | Engineering teams |
| **Certificate and key store scanning** | Inventory X.509 certificates and key material by algorithm | Infrastructure and PKI teams |
| **Multi-repo organizational scan** | Scan an entire GitHub organization in a single command | Enterprise security teams |
| **Federal OSCAL output** | Export findings in NIST OSCAL format for FedRAMP and FISMA submissions | Federal agencies and contractors |

---

## Strategic Vision

The 2030 CNSA 2.0 compliance deadline creates a hard constraint for every organization operating in or adjacent to the US federal market. The bottleneck is not expertise — it is discovery. Security teams cannot migrate what they cannot find.

PQC-Atlas's long-term goal is to be the **cryptographic observability layer** for every engineering organization undergoing post-quantum migration — the same way dependency scanners (Snyk, Dependabot) became standard practice for supply chain security.

---

## How to Influence the Roadmap

- Open a [GitHub Issue](https://github.com/saisravan909/pqc-atlas/issues) labeled `roadmap`
- Start a [GitHub Discussion](https://github.com/saisravan909/pqc-atlas/discussions) for broader feature conversations
- Submit a pull request — accepted contributions accelerate roadmap items

---

*PQC-Atlas — Apache License 2.0 — Innovators: Sai Sravan Cherukuri & Sai Saketh Cherukuri*
