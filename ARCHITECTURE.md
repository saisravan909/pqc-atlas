# PQC-Atlas: Technical Architecture

## 1. Discovery Engine (AST)
Unlike simple pattern matching, PQC-Atlas utilizes **Abstract Syntax Tree (AST)** parsing via Go's `go/ast` library. This allows the engine to distinguish between actual cryptographic implementation and dead code or comments.

## 2. Lattice Signature Database (LSDB)
Discovered primitives are mapped against a proprietary mapping of legacy OIDs to **NIST FIPS 203/204** standards.

## 3. CBOM Synthesis
Findings are serialized into **CycloneDX 1.7** JSON format, the federal standard for Cryptographic Bills of Materials (CBOM).
