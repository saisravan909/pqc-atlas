# Security Policy

PQC-Atlas is a security tool. We hold ourselves to the same standard of cryptographic hygiene we ask of the codebases we scan.

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| `main` branch | Yes — active development |
| Tagged releases | Yes — patch fixes backported |

---

## Reporting a Vulnerability

**Please do not file a public GitHub issue for security vulnerabilities.**

If you discover a security issue in PQC-Atlas — including false negatives (missed vulnerabilities), false positives that could mislead compliance decisions, or vulnerabilities in the scanner engine itself — report it privately:

**Contact:** Open a [GitHub Security Advisory](https://github.com/saisravan909/pqc-atlas/security/advisories/new)

We will acknowledge receipt within **48 hours** and provide a remediation timeline within **7 days**.

---

## Scope

Reports are welcomed for:

- **False negatives** — quantum-vulnerable algorithms that PQC-Atlas fails to detect
- **False positives** — findings that incorrectly flag safe code as vulnerable
- **CBOM integrity** — issues that could cause incorrect or misleading output in the generated CycloneDX report
- **CI gate bypass** — conditions under which the GitHub Actions gate fails to block a violating pull request
- **Dependency vulnerabilities** — PQC-Atlas uses Go standard library only (no external dependencies), but report anything that changes this

Out of scope: performance issues, UI/UX of the CLI output, feature requests.

---

## Our Cryptographic Commitments

PQC-Atlas itself uses no cryptographic primitives. It is a static analysis tool. There is no authentication, no encryption, no secret storage, and no network communication in the scanner engine.

The GitHub Actions integration runs in your own CI environment under your own credentials. PQC-Atlas never transmits scan results externally.

---

## Disclosure Policy

We follow **coordinated disclosure**:

1. Reporter submits finding privately
2. We confirm and assess within 48 hours
3. We develop and test a fix
4. We release the fix and credit the reporter (unless anonymity is requested)
5. Full disclosure after patch is available

---

*PQC-Atlas — Apache License 2.0 — github.com/saisravan909/pqc-atlas*
