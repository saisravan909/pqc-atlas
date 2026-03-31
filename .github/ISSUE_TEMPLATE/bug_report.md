---
name: Bug Report
about: Report a false negative (missed vulnerability), false positive, or scanner error
title: "[BUG] "
labels: bug
assignees: ''
---

## What happened?

<!-- Describe the issue clearly. -->

## What did you expect to happen?

## Scanner command used

```bash
go run main.go scan --path ...
```

## Code sample that triggers the issue

```go
// Paste the minimal code snippet here
```

## PQC-Atlas output

```
# Paste the scan output here
```

## Environment

- Go version: `go version`
- OS:
- PQC-Atlas commit/version:

## Is this a false negative (missed finding) or false positive (incorrect finding)?

- [ ] False negative — PQC-Atlas missed a vulnerability it should have caught
- [ ] False positive — PQC-Atlas flagged safe code as vulnerable
- [ ] Scanner crash or error
- [ ] Incorrect CBOM output
- [ ] Other
