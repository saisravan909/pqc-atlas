# PQC-Atlas — Executive Summary

**For:** C-Suite, Board Members, Procurement Officers, Compliance Directors
**Reading time:** 5 minutes

---

## The Problem in Plain Terms

Every organization that sends data securely — banks, hospitals, defense contractors, government agencies — relies on encryption. That encryption is built on mathematics that a sufficiently powerful quantum computer can break in hours.

That quantum computer does not exist yet. But nation-state adversaries are already collecting encrypted data today, storing it, and waiting for the day it can be decrypted. This strategy is called **Harvest Now, Decrypt Later (HNDL)**.

When that computer arrives — estimated between 2030 and 2035 — every piece of data protected by today's standard encryption (RSA, ECC) becomes an open book. Retroactively. With no warning.

**The US government has set a hard deadline:** Federal agencies and critical infrastructure operators must complete their migration to quantum-safe cryptography by 2030 under CNSA 2.0.

---

## Why Most Organizations Are Not Ready

The technology to replace vulnerable encryption exists. NIST finalized the new standards in 2024 (ML-KEM, ML-DSA). The problem is not knowing what to replace.

A typical enterprise has millions of lines of code across dozens of languages and teams. Quantum-vulnerable cryptographic functions are embedded throughout — in authentication systems, data storage, API communications, and signing workflows. **Nobody has a complete map.**

Without knowing where the vulnerable code is, migration cannot begin. This is the gap PQC-Atlas closes.

---

## What PQC-Atlas Does

PQC-Atlas is an automated scanner that reads an organization's source code — without executing it — and produces a complete inventory of every quantum-vulnerable cryptographic function, exactly where it lives, and how urgently it needs to be replaced.

**In three steps:**

**1. Scan** — PQC-Atlas analyzes code written in Go, Python, and Java (with more languages planned). It finds every cryptographic function by reading the code structure, not just searching for keywords. A full scan of a typical microservice completes in milliseconds.

**2. Score** — Each finding receives a Quantum Exposure Score (QES) — a numerical risk rating from 0 to 1.10 that tells engineers and managers which algorithms to address first, based on HNDL exposure and NIST migration urgency.

**3. Report** — PQC-Atlas generates a Cryptographic Bill of Materials (CBOM) — a structured, machine-readable document listing every finding with the specific NIST-approved algorithm that should replace it. This document can be submitted directly to federal GRC platforms for compliance verification.

---

## The Business Value

| Benefit | Detail |
|---------|--------|
| **Compliance readiness** | Demonstrates progress toward NSM-10 and CNSA 2.0 mandates with an auditable CBOM artifact |
| **Risk quantification** | Converts an invisible threat (HNDL) into a measurable, prioritized inventory |
| **Zero operational disruption** | Runs as part of the existing software development pipeline with no changes to production systems |
| **Prevents future exposure** | CI gate blocks new quantum-vulnerable code from entering production from day one |
| **Audit-ready output** | CycloneDX 1.7 CBOM is the format requested by federal auditors and GRC platforms |

---

## Where We Are Today

PQC-Atlas v1.0 is fully operational. It has been validated against a realistic multi-language microservice application, detecting 17 cryptographic vulnerabilities across Go, Python, and Java in 3.51 milliseconds.

It is open-source under the Apache 2.0 license — meaning any organization can use it today at no cost.

---

## What Comes Next

The roadmap extends to an enterprise platform with:
- Coverage for additional languages (Rust, C/C++, JavaScript)
- Direct integration with Jira, ServiceNow GRC, and GitLab
- Organization-wide scanning across all repositories from a single command
- Federal OSCAL output for FedRAMP and FISMA submissions

See [ROADMAP.md](../ROADMAP.md) for the full development plan.

---

## The Core Message

The 2030 deadline is not optional. The threat is not theoretical — it is active. And migration cannot begin without a map.

PQC-Atlas is that map.

---

**Innovators:** Sai Sravan Cherukuri & Sai Saketh Cherukuri
**Repository:** github.com/saisravan909/pqc-atlas
**License:** Apache 2.0
**Standards Alignment:** NIST FIPS 203/204/205 · NSM-10 · CNSA 2.0 · CycloneDX 1.7
