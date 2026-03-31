# Security Policy

> PQC-Atlas is a security tool. We hold ourselves to the same standard of cryptographic hygiene we ask of the codebases we scan.

---

## Supported Versions

| Version | Supported | Notes |
|---------|-----------|-------|
| `main` branch | ✅ Active | All fixes applied here first |
| Tagged releases | ✅ Active | Critical patches backported |
| Forks | ❌ | Forks are not maintained by this project |

---

## How to Report a Vulnerability

**Do not file a public GitHub issue for security vulnerabilities.**

Report privately via [GitHub Security Advisories](https://github.com/saisravan909/pqc-atlas/security/advisories/new).

We will:
- Acknowledge receipt within **48 hours**
- Provide an assessment and timeline within **7 days**
- Notify you when a fix is released
- Credit you in the release notes (unless you request anonymity)

---

## Scope — What We Want to Hear About

| Category | Examples |
|----------|---------|
| **False negatives** | A quantum-vulnerable algorithm that PQC-Atlas fails to detect |
| **False positives** | Code flagged as vulnerable that is actually safe |
| **CBOM integrity** | Findings that produce incorrect or misleading CycloneDX output |
| **CI gate bypass** | Conditions where the gate passes despite CRITICAL findings |
| **Scan evasion** | Code patterns that evade detection |

---

## Out of Scope

- Performance issues
- CLI output formatting preferences
- Feature requests (use [GitHub Issues](https://github.com/saisravan909/pqc-atlas/issues) instead)
- Vulnerabilities in example code (`examples/legacy-app/`) — those are **intentionally vulnerable** by design

---

## Our Security Commitments

**No cryptographic operations:** PQC-Atlas is a static analysis tool. It does not perform any cryptographic operations, authentication, or encryption itself.

**No network communication:** The scanner engine operates entirely locally. No scan results are transmitted externally.

**No secret handling:** PQC-Atlas does not access, store, or transmit API keys, tokens, or credentials.

**Zero external dependencies:** The core scanner uses only the Go standard library. No third-party packages means no transitive supply-chain risk.

**GitHub Actions isolation:** The CI integration runs in your own CI environment under your own credentials. PQC-Atlas never has access to your GitHub token or repository secrets.

---

## Disclosure Policy

We follow **coordinated disclosure**:

```
Report received  →  Acknowledged (48h)  →  Fix developed  →  Release  →  Public disclosure
```

1. Reporter submits vulnerability privately
2. We confirm and assess within 48 hours
3. We develop and test a fix
4. Fix is released in a tagged version
5. Reporter is credited in release notes
6. Full public disclosure after patch is available

Minimum embargo period: **7 days** after fix release.
Maximum embargo period: **90 days** from initial report (per industry standard).

---

## PGP / Encrypted Communication

For highly sensitive findings, contact us via GitHub Security Advisories which provides end-to-end encryption through GitHub's platform.

---

*PQC-Atlas — Apache License 2.0 — github.com/saisravan909/pqc-atlas*
