# PQC-Atlas Glossary

A reference for all acronyms, terms, and risk classifications used throughout this project.
Intended for all audiences — from C-suite executives to security engineers.

---

## Part 1 — Acronyms & Terms

| Term | Full Name | Plain-English Meaning |
|------|-----------|----------------------|
| **AST** | Abstract Syntax Tree | A structural map of source code that a computer builds before running it. PQC-Atlas uses this map to find cryptographic function calls in Go code with surgical precision — not just keyword matching. |
| **CBOM** | Cryptographic Bill of Materials | A machine-readable inventory of every cryptographic algorithm used in a codebase — where it is, what it does, and how risky it is. The PQC equivalent of a software component manifest. |
| **CNSA 2.0** | Commercial National Security Algorithm Suite 2.0 | A US government directive (issued by NSA/CISA) requiring federal agencies and critical infrastructure operators to migrate to post-quantum algorithms by 2030–2033. Non-compliance is a national security failure. |
| **CRQC** | Cryptographically Relevant Quantum Computer | A quantum computer powerful enough to break RSA, ECC, and DSA encryption. Estimated to arrive between 2030–2035. Once it exists, all data protected by classical cryptography is retroactively vulnerable. |
| **DES** | Data Encryption Standard | A 1970s-era symmetric encryption algorithm considered fully broken. Modern equivalent: AES-256. |
| **DSA** | Digital Signature Algorithm | A classical signature algorithm based on discrete logarithm math. Broken by a CRQC using Shor's Algorithm. NIST replacement: ML-DSA (FIPS 204). |
| **ECC** | Elliptic Curve Cryptography | A family of public-key algorithms (ECDSA, ECDH) widely used in TLS, SSH, and code signing. Completely broken by a CRQC. NIST replacement: ML-KEM (FIPS 203) or ML-DSA (FIPS 204) depending on use case. |
| **ECDSA** | Elliptic Curve Digital Signature Algorithm | A specific ECC-based signature scheme used in TLS certificates, JWT tokens, and blockchain systems. Quantum-vulnerable. |
| **FIPS** | Federal Information Processing Standards | US government standards for cryptographic modules and algorithms, published by NIST. FIPS 203, 204, and 205 are the three new post-quantum standards. |
| **FIPS 202** | SHA-3 Standard | The approved hash function standard based on the Keccak algorithm. Considered quantum-safe (Grover's Algorithm halves security but SHA3-256 remains adequate at 128-bit quantum security). |
| **FIPS 203** | ML-KEM (Module-Lattice Key Encapsulation Mechanism) | The NIST-approved post-quantum replacement for RSA and ECC in key exchange and encryption contexts. Also known as CRYSTALS-Kyber. |
| **FIPS 204** | ML-DSA (Module-Lattice Digital Signature Algorithm) | The NIST-approved post-quantum replacement for RSA signatures, DSA, and ECDSA. Also known as CRYSTALS-Dilithium. |
| **FIPS 205** | SLH-DSA (Stateless Hash-based Digital Signature Algorithm) | A secondary post-quantum signature standard based on hash functions rather than lattice math. Also known as SPHINCS+. |
| **GRC** | Governance, Risk & Compliance | The enterprise software category covering policy management, audit reporting, and regulatory compliance. PQC-Atlas CBOM output is designed to be ingested directly by GRC platforms. |
| **HNDL** | Harvest Now, Decrypt Later | An active attack strategy where adversaries collect and store encrypted network traffic today, intending to decrypt it once a CRQC becomes available. Requires no current access to plaintext — only the captured ciphertext. |
| **LSDB** | Local Standards Database | PQC-Atlas's internal mapping table that links legacy algorithm identifiers (OIDs) to their NIST post-quantum replacements and risk classifications. |
| **MD5** | Message Digest 5 | A cryptographic hash function considered fully broken since 2004. Collision attacks are trivially executable on commodity hardware. |
| **ML-DSA** | Module-Lattice Digital Signature Algorithm | See FIPS 204. The post-quantum signature standard replacing RSA and ECDSA. |
| **ML-KEM** | Module-Lattice Key Encapsulation Mechanism | See FIPS 203. The post-quantum key exchange standard replacing RSA and ECC. |
| **NIST** | National Institute of Standards and Technology | The US federal agency responsible for cryptographic standards. Their post-quantum standardization project (2016–2024) produced FIPS 203, 204, and 205. |
| **NSM-10** | National Security Memorandum 10 | A White House directive (May 2022) mandating that US federal agencies inventory their quantum-vulnerable cryptography and begin migration planning. PQC-Atlas automates NSM-10 compliance. |
| **OID** | Object Identifier | A standardized numeric identifier used to label cryptographic algorithms in certificates and protocols (e.g., `1.2.840.113549.1.1.1` = RSA). PQC-Atlas maps these to NIST replacements. |
| **PQC** | Post-Quantum Cryptography | Cryptographic algorithms mathematically resistant to attacks from quantum computers. Standardized by NIST in 2024 (FIPS 203, 204, 205). |
| **PQC-Atlas** | Post-Quantum Cryptography Atlas | This tool. An open-source static analysis and cryptographic observability engine that discovers quantum-vulnerable algorithms in Go, Python, and Java codebases and generates a CycloneDX CBOM. |
| **QES** | Quantum Exposure Score | PQC-Atlas's proprietary risk metric. A numerical score (0.00–1.10) quantifying how urgently a cryptographic finding must be migrated, based on algorithm strength, key size, and HNDL exposure. |
| **Regex** | Regular Expression | A pattern-matching technique used to find text strings. PQC-Atlas uses this for Python and Java scanning where AST parsing is not available. |
| **RSA** | Rivest–Shamir–Adleman | The most widely deployed public-key cryptosystem, used in TLS, SSH, code signing, and PKI. Completely broken by Shor's Algorithm on a CRQC. NIST replacement: ML-KEM (FIPS 203) or ML-DSA (FIPS 204). |
| **SDLC** | Software Development Lifecycle | The end-to-end process by which software is designed, built, tested, and deployed. PQC-Atlas is designed to embed cryptographic governance into the SDLC from day one. |
| **SHA-1** | Secure Hash Algorithm 1 | A deprecated cryptographic hash function. Collision attacks have been demonstrated since 2017. Still commonly found in legacy codebases. |
| **SHA-256/384/512** | Secure Hash Algorithm (256/384/512-bit) | Quantum-weakened but not broken. A CRQC using Grover's Algorithm effectively halves security bits (SHA-256 → 128-bit quantum security). Currently considered acceptable with appropriate key sizes. |
| **Shor's Algorithm** | — | A quantum algorithm (1994) that efficiently factors large integers and solves discrete logarithm problems — the mathematical foundations of RSA, ECC, and DSA. A CRQC running Shor's Algorithm renders all these systems broken. |
| **TLS** | Transport Layer Security | The protocol securing HTTPS web traffic, email, and most networked communications. Relies on RSA and ECC — both quantum-vulnerable. |

---

## Part 2 — Risk Taxonomy

PQC-Atlas classifies every finding into one of three tiers based on quantum threat severity.

---

### CRITICAL — Quantum-Vulnerable (HNDL Risk)

> **QES Range: 0.90 – 1.10**

These algorithms are mathematically broken by a Cryptographically Relevant Quantum Computer using **Shor's Algorithm**. Data encrypted with these algorithms today is already being harvested by adversaries for future decryption. Migration is not optional.

| Algorithm | Why It's Critical | NIST Replacement |
|-----------|-------------------|-----------------|
| RSA (all key sizes) | Integer factorization — solved by Shor's in hours | FIPS 203 — ML-KEM |
| ECC / ECDSA | Elliptic curve discrete log — solved by Shor's | FIPS 204 — ML-DSA |
| DSA | Discrete logarithm — solved by Shor's | FIPS 204 — ML-DSA |
| DH / ECDH | Key exchange based on discrete log | FIPS 203 — ML-KEM |

**Business meaning:** Every byte of data currently protected by these algorithms can be decrypted retroactively once a CRQC exists. HNDL attacks mean sensitive data encrypted today may already be stored by adversaries awaiting that moment.

---

### HIGH — Quantum-Weakened (HNDL Risk)

> **QES Range: 0.60 – 0.89**

These algorithms are not broken by Shor's Algorithm but are significantly weakened by **Grover's Algorithm**, which halves effective security bit length. They also carry HNDL risk for long-lived data. Migration should be prioritized before 2027.

| Algorithm | Why It's High | NIST Replacement |
|-----------|---------------|-----------------|
| MD5 | Already classically broken (collision attacks); Grover makes it trivial | SHA-3 (FIPS 202) |
| SHA-1 | Collision-broken since 2017; Grover halves remaining margin | SHA-256 or SHA-3 |
| DES / 3DES | Key size insufficient even classically; Grover eliminates remaining security | AES-256 |
| AES-128 | Grover reduces to 64-bit effective security — insufficient for classified data | AES-256 |

**Business meaning:** These algorithms have degraded security margins. Some are already classically broken (MD5, SHA-1). All are inadequate for protecting data with long confidentiality requirements (healthcare records, classified communications, financial archives).

---

### MEDIUM — Classically Deprecated

> **QES Range: 0.30 – 0.59**

These algorithms are not quantum-vulnerable but are deprecated by current classical standards. They represent technical debt and compliance risk, particularly under FIPS 140-3 and SOC 2 audits.

| Algorithm | Why It's Medium | Recommendation |
|-----------|----------------|----------------|
| SHA-256 (legacy contexts) | Classically sound; Grover weakens marginally | Acceptable with proper key hygiene; monitor NIST guidance |
| RC4 | Stream cipher — classically broken | Remove immediately |
| MD4 | Hash function — classically broken | Remove immediately |

**Business meaning:** These findings do not represent immediate quantum risk but signal cryptographic hygiene issues that will surface in compliance audits. They should be addressed as part of normal engineering cycles.

---

## Decision Matrix — Who Does What

| Finding Tier | Immediate Action | Owner | Timeline |
|---|---|---|---|
| CRITICAL | Block deployment. Open P0 ticket. Begin NIST replacement planning. | CISO + Engineering Lead | Before 2027 (new systems), Before 2030 (all systems) |
| HIGH | Schedule migration sprint. Add to cryptographic roadmap. | Security Engineering | Before 2028 |
| MEDIUM | Address in next refactor cycle. Document exception if deferred. | Engineering | Within 12 months |

---

*PQC-Atlas is an open-source project by Sai Sravan Cherukuri & Sai Saketh Cherukuri.*
*Apache License 2.0 — github.com/saisravan909/pqc-atlas*
