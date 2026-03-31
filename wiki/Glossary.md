# Glossary

> Every acronym, term, and concept used in PQC-Atlas — defined in plain English.
> Intended for all audiences from C-suite to security engineers.

---

## Quick Reference

| Term | One-Line Definition |
|------|---------------------|
| AST | Structural map of source code used for precise scanning |
| CBOM | Machine-readable inventory of cryptographic assets |
| CNSA 2.0 | US government mandate — migrate to post-quantum crypto by 2030 |
| CRQC | A quantum computer powerful enough to break RSA and ECC |
| ECC | Elliptic curve cryptography — quantum-vulnerable |
| FIPS 203 | NIST post-quantum standard for key exchange (ML-KEM) |
| FIPS 204 | NIST post-quantum standard for signatures (ML-DSA) |
| HNDL | Harvest Now, Decrypt Later — active adversary strategy |
| ML-DSA | Post-quantum replacement for RSA signatures and ECDSA |
| ML-KEM | Post-quantum replacement for RSA encryption and ECDH |
| NSM-10 | White House directive to inventory quantum-vulnerable systems |
| PQC | Post-Quantum Cryptography — quantum-resistant algorithms |
| QES | Quantum Exposure Score — PQC-Atlas's risk metric (0.00–1.10) |
| RSA | Most widely deployed public-key algorithm — quantum-vulnerable |
| Shor's Algorithm | Quantum algorithm that breaks RSA and ECC |

---

## Full Definitions

### A

**AST (Abstract Syntax Tree)**
A structural representation of source code that a compiler builds before executing the program. PQC-Atlas uses Go's native AST parser to identify cryptographic function calls with surgical precision — not keyword matching. This means it finds `rsa.GenerateKey()` even inside complex control flow, and does not trigger on comments or string literals.

---

### C

**CBOM (Cryptographic Bill of Materials)**
A machine-readable inventory of every cryptographic algorithm used in a codebase — including what algorithm it is, where it lives, how risky it is, and what the approved replacement is. PQC-Atlas generates CBOMs in the CycloneDX 1.7 format. The CBOM is the deliverable federal auditors and GRC platforms accept as evidence of cryptographic inventory.

**CNSA 2.0 (Commercial National Security Algorithm Suite 2.0)**
A US government directive issued by the NSA and CISA that establishes binding timelines for post-quantum migration:
- 2025: Begin planning and inventory
- 2027: New systems must use post-quantum algorithms only
- 2030: All systems must complete migration
- 2033: Classical algorithms fully deprecated

**CRQC (Cryptographically Relevant Quantum Computer)**
A quantum computer with sufficient qubit count and error correction to run Shor's Algorithm against real-world key sizes. Distinguished from today's noisy intermediate-scale quantum (NISQ) devices, which cannot break production cryptography. A CRQC is estimated to arrive between 2030 and 2035. Once it exists, all RSA, ECC, and DSA keys are retroactively compromised.

**CycloneDX**
An open standard for Software Bill of Materials (SBOM) and Cryptographic Bill of Materials (CBOM). CycloneDX 1.7 introduced the `cryptographic-asset` component type used by PQC-Atlas. The format is JSON or XML and is accepted by NIST's OSCAL tooling and federal GRC platforms.

---

### D

**DES (Data Encryption Standard)**
A 1970s-era 56-bit symmetric cipher, now completely broken. Grover's Algorithm reduces it to approximately 28 bits of effective security. Any system using DES should migrate to AES-256 immediately.

**DSA (Digital Signature Algorithm)**
A classical signature algorithm based on the discrete logarithm problem. Completely broken by Shor's Algorithm on a CRQC. NIST replacement: ML-DSA (FIPS 204).

---

### E

**ECC (Elliptic Curve Cryptography)**
A family of public-key algorithms (ECDSA, ECDH, Ed25519) based on elliptic curve mathematics. Widely used in TLS, SSH, code signing, and JWT tokens. Completely broken by Shor's Algorithm because it relies on the elliptic curve discrete logarithm problem.

**ECDSA (Elliptic Curve Digital Signature Algorithm)**
A specific ECC signature scheme used in TLS certificates, code signing, and blockchain systems. Quantum-vulnerable. NIST replacement: ML-DSA (FIPS 204).

---

### F

**FIPS (Federal Information Processing Standards)**
US government standards published by NIST for cryptographic modules and algorithms. The three new post-quantum standards are:
- **FIPS 203**: ML-KEM (key encapsulation)
- **FIPS 204**: ML-DSA (digital signatures)
- **FIPS 205**: SLH-DSA (hash-based signatures)

**FIPS 202 (SHA-3)**
The approved standard for the SHA-3 hash function family, based on the Keccak algorithm. Considered quantum-safe for SHA3-256 and above (Grover's Algorithm halves security but 128-bit quantum security is acceptable).

**FIPS 203 (ML-KEM)**
The NIST post-quantum standard for key encapsulation. ML-KEM (Module-Lattice Key Encapsulation Mechanism) replaces RSA and ECC in key exchange and encryption contexts. Also known as CRYSTALS-Kyber.

**FIPS 204 (ML-DSA)**
The NIST post-quantum standard for digital signatures. ML-DSA (Module-Lattice Digital Signature Algorithm) replaces RSA signatures, DSA, and ECDSA. Also known as CRYSTALS-Dilithium.

**FIPS 205 (SLH-DSA)**
A secondary post-quantum signature standard based on stateless hash functions rather than lattice mathematics. Also known as SPHINCS+. Provides algorithm diversity for high-assurance environments.

---

### G

**GRC (Governance, Risk & Compliance)**
Enterprise software platforms (ServiceNow GRC, Archer, OneTrust) used for policy management, audit reporting, and regulatory tracking. PQC-Atlas CBOM output is designed to be ingested directly by GRC platforms.

**Grover's Algorithm**
A quantum algorithm that searches an unsorted database in O(√N) time, effectively halving the security bit length of any symmetric or hash primitive. SHA-256 becomes approximately 128-bit quantum-secure. AES-128 becomes approximately 64-bit quantum-secure. Unlike Shor's Algorithm, Grover's Algorithm does not fully break these algorithms — it weakens them.

---

### H

**HNDL (Harvest Now, Decrypt Later)**
An active intelligence strategy used by nation-state adversaries. Encrypted network traffic is collected and stored today at scale. When a CRQC becomes available, the stored ciphertext is decrypted retroactively. No access to the original systems is required — only the captured ciphertext. HNDL attacks are documented and ongoing.

---

### L

**LSDB (Local Standards Database)**
PQC-Atlas's internal mapping table that links detected algorithm identifiers to their NIST post-quantum replacements, QES scores, and risk classifications. Located in `pkg/lsdb/standards.go`.

---

### M

**MD5 (Message Digest 5)**
A cryptographic hash function broken by collision attacks since 2004. Trivially exploitable on commodity hardware today. Any system using MD5 for integrity or authentication is currently vulnerable to classical attacks, not just quantum.

**ML-DSA (Module-Lattice Digital Signature Algorithm)**
See FIPS 204. The post-quantum replacement for RSA signatures, DSA, and ECDSA. Based on lattice mathematics, which is believed to be resistant to both classical and quantum attacks.

**ML-KEM (Module-Lattice Key Encapsulation Mechanism)**
See FIPS 203. The post-quantum replacement for RSA encryption, ECDH, and Diffie-Hellman key exchange. Based on the Module Learning With Errors (MLWE) problem.

---

### N

**NIST (National Institute of Standards and Technology)**
The US federal agency responsible for cryptographic standards. NIST's Post-Quantum Cryptography Standardization Project (2016–2024) produced FIPS 203, 204, and 205.

**NSM-10 (National Security Memorandum 10)**
A White House directive issued May 4, 2022, mandating that all US federal agencies inventory their quantum-vulnerable cryptographic systems and develop migration plans. PQC-Atlas automates NSM-10 inventory compliance.

---

### O

**OID (Object Identifier)**
A standardized hierarchical numeric identifier used to label cryptographic algorithms in X.509 certificates, CMS structures, and protocol specifications. For example, `1.2.840.113549.1.1.1` identifies RSA. PQC-Atlas uses OIDs to precisely identify detected algorithms.

---

### P

**PQC (Post-Quantum Cryptography)**
Cryptographic algorithms whose security does not rely on problems solvable by quantum computers. NIST standardized three PQC algorithms in 2024: ML-KEM (FIPS 203), ML-DSA (FIPS 204), and SLH-DSA (FIPS 205).

**PQC-Atlas**
This tool. An open-source static analysis and cryptographic observability engine that discovers quantum-vulnerable algorithms in Go, Python, and Java codebases and generates a CycloneDX 1.7 CBOM with NIST post-quantum replacement guidance per finding.

---

### Q

**QES (Quantum Exposure Score)**
PQC-Atlas's proprietary risk metric. A numerical score between 0.00 and 1.10 assigned to each finding based on algorithm class, key size, HNDL exposure, and NIST migration urgency. Higher scores require more urgent migration.

---

### R

**RSA (Rivest–Shamir–Adleman)**
The most widely deployed public-key cryptosystem. Used in TLS certificates, SSH, code signing, and PKI. Based on the difficulty of factoring large integers. Completely broken by Shor's Algorithm on a CRQC — key size is irrelevant. NIST replacement: ML-KEM (FIPS 203) for encryption, ML-DSA (FIPS 204) for signing.

---

### S

**SDLC (Software Development Lifecycle)**
The end-to-end process by which software is designed, built, tested, and deployed. PQC-Atlas is designed to embed cryptographic governance into the SDLC as a CI/CD gate — preventing quantum-vulnerable code from entering production from day one.

**SHA-1 (Secure Hash Algorithm 1)**
A deprecated hash function. Practical collision attacks demonstrated in 2017 (SHAttered). Grover's Algorithm further weakens remaining security margins. Any system using SHA-1 for integrity or authentication is currently vulnerable.

**SHA-256 / SHA-384 / SHA-512**
Currently acceptable hash functions. Grover's Algorithm halves effective security (SHA-256 → 128-bit quantum security). Considered adequate at current key sizes. Monitor NIST guidance for future deprecation.

**Shor's Algorithm**
A quantum algorithm published in 1994 by Peter Shor that solves integer factorization and discrete logarithm problems in polynomial time. These are the mathematical foundations of RSA, ECC, and DSA. A CRQC running Shor's Algorithm renders all three algorithm families completely broken.

---

### T

**TLS (Transport Layer Security)**
The protocol securing HTTPS web traffic, email (SMTPS), and most networked communications. Relies on RSA and ECC for key exchange and authentication — both quantum-vulnerable. TLS 1.3 with post-quantum key exchange (e.g., X25519+ML-KEM) is the migration target.
