# Executive Brief

> **For:** C-Suite · Board Members · Procurement Officers · Compliance Directors
> **Reading time:** 5 minutes · No technical background required

---

## The Problem — In Plain Terms

Every organization that communicates, stores data, or conducts transactions securely relies on **encryption**. That encryption protects your customer records, financial data, intellectual property, and government communications.

That encryption is built on mathematics. And that mathematics is **broken by quantum computers**.

A sufficiently powerful quantum computer — called a Cryptographically Relevant Quantum Computer (CRQC) — can defeat RSA and ECC encryption in **hours**. Not years. Hours.

That computer does not exist yet. It is estimated to arrive between 2030 and 2035.

But **adversaries are not waiting**.

---

## The Active Threat — Harvest Now, Decrypt Later

Nation-state actors are running an active intelligence strategy called **Harvest Now, Decrypt Later (HNDL)**:

1. Collect and store encrypted network traffic today — at scale
2. Wait for a CRQC to become available
3. Decrypt everything retroactively — with no access to the original systems required

This means data encrypted **right now** may already be compromised. The attack has already happened. The decryption is just pending.

---

## The Mandate — 2030 Is Not Optional

The United States government has issued hard deadlines:

| Directive | Requirement | Deadline |
|-----------|-------------|----------|
| NSM-10 | Inventory all quantum-vulnerable cryptographic systems | Immediate |
| CNSA 2.0 | New systems must use post-quantum algorithms only | 2027 |
| CNSA 2.0 | All systems must complete migration | 2030 |
| CNSA 2.0 | Classical algorithms fully deprecated | 2033 |

Federal agencies, defense contractors, critical infrastructure operators, and financial institutions operating in regulated markets face binding compliance requirements. Non-compliance is a national security and regulatory risk.

---

## The Gap — Cryptographic Blindness

The technology to replace vulnerable encryption **already exists**. NIST finalized post-quantum standards in 2024 (ML-KEM, ML-DSA).

The problem is **not knowing what to replace**.

A typical enterprise has millions of lines of code across dozens of teams, languages, and systems. Quantum-vulnerable functions — RSA keys, elliptic curve signatures, legacy hash algorithms — are embedded throughout with no central inventory.

**No inventory → no migration → no compliance.**

This is the gap PQC-Atlas closes.

---

## The Solution — PQC-Atlas

PQC-Atlas is an automated scanner that reads an organization's source code — **without executing it** — and produces a complete inventory of every quantum-vulnerable cryptographic function: exactly where it lives, how risky it is, and what the NIST-approved replacement is.

### Three Steps

```
SCAN  →  SCORE  →  REPORT
```

| Step | What Happens | Time |
|------|-------------|------|
| **Scan** | PQC-Atlas reads Go, Python, and Java source code structurally — finding every cryptographic function call by exact location | Milliseconds |
| **Score** | Each finding receives a Quantum Exposure Score (QES) — a number from 0–1.10 quantifying HNDL severity and NIST migration urgency | Instant |
| **Report** | A Cryptographic Bill of Materials (CBOM) is generated in CycloneDX 1.7 format — machine-readable, auditable, GRC-ingestible | Instant |

---

## Business Value

| Benefit | Detail |
|---------|--------|
| **Compliance readiness** | NSM-10 cryptographic inventory + CNSA 2.0 milestone tracking from day one |
| **Risk quantification** | HNDL exposure converted from invisible threat to prioritized, numbered inventory |
| **Zero operational disruption** | Runs in the existing development pipeline — no production system changes required |
| **Prevents future exposure** | CI/CD gate blocks new quantum-vulnerable code from entering any codebase from day one |
| **Audit-ready output** | CycloneDX 1.7 CBOM accepted by federal GRC platforms and auditors |
| **No vendor lock-in** | Open-source, Apache 2.0 — runs anywhere Go runs |

---

## Current Status

PQC-Atlas v1.0 is **fully operational and open-source**.

Validated against a realistic multi-language microservice: **17 vulnerabilities detected across Go, Python, and Java in 3.51 milliseconds**.

Available today at zero cost under the Apache 2.0 license.

---

## Strategic Vision

The 2030 deadline creates a hard forcing function for every organization in or adjacent to the US federal market. The organizations that begin discovery now will have a 3–5 year head start on migration.

The organizations that do not will face an emergency remediation sprint under audit pressure and regulatory scrutiny.

PQC-Atlas is the foundation of the discovery phase.

---

## One Sentence

> **The 2030 deadline is not optional. Migration begins with discovery. PQC-Atlas is that discovery.**

---

*Innovators: Sai Sravan Cherukuri & Sai Saketh Cherukuri*
*github.com/saisravan909/pqc-atlas · Apache 2.0*
*NIST FIPS 203/204/205 · NSM-10 · CNSA 2.0 · CycloneDX 1.7*
