# Pull Request

## Summary

<!-- What does this PR do? One or two sentences. -->

## Type of change

- [ ] New algorithm detection rule
- [ ] New language scanner
- [ ] Bug fix (false negative or false positive)
- [ ] CI/CD integration improvement
- [ ] CBOM output change
- [ ] Documentation update
- [ ] Other

## Cryptographic context

<!-- If this adds or changes a detection rule, describe the algorithm and why it is quantum-vulnerable or deprecated. Reference the relevant NIST standard if applicable. -->

**Algorithm(s) affected:**
**NIST replacement:**
**QES tier:** CRITICAL / HIGH / MEDIUM

## Testing

- [ ] `go test ./...` passes
- [ ] `go vet ./...` passes with no warnings
- [ ] Tested against `examples/legacy-app/`
- [ ] New detection rule has a corresponding test case
- [ ] CBOM output is valid CycloneDX 1.7 JSON

## Checklist

- [ ] No external dependencies added (Go stdlib only)
- [ ] No global state introduced
- [ ] Comments written in plain English
- [ ] GLOSSARY.md updated if new acronyms or terms are introduced
