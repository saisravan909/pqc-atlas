package lattice

// LSDB is the Lattice Signature Database.
// It maps legacy cryptographic OIDs to their NIST PQC replacements
// under FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA).

type LegacyOID struct {
	OID         string
	Algorithm   string
	KeyBits     int
	Vulnerable  bool
	Replacement NISTStandard
}

type NISTStandard struct {
	FIPS        string
	Name        string
	Primitive   string
	SecurityLevel int
}

var FIPS203_ML_KEM = NISTStandard{
	FIPS:          "FIPS 203",
	Name:          "ML-KEM (CRYSTALS-Kyber)",
	Primitive:     "Key Encapsulation Mechanism",
	SecurityLevel: 3,
}

var FIPS204_ML_DSA = NISTStandard{
	FIPS:          "FIPS 204",
	Name:          "ML-DSA (CRYSTALS-Dilithium)",
	Primitive:     "Digital Signature Algorithm",
	SecurityLevel: 3,
}

var FIPS205_SLH_DSA = NISTStandard{
	FIPS:          "FIPS 205",
	Name:          "SLH-DSA (SPHINCS+)",
	Primitive:     "Stateless Hash-Based Signature",
	SecurityLevel: 3,
}

// OIDDatabase is the master registry of known quantum-vulnerable OIDs.
var OIDDatabase = []LegacyOID{
	{
		OID: "1.2.840.113549.1.1.1", Algorithm: "RSA", KeyBits: 2048,
		Vulnerable: true, Replacement: FIPS204_ML_DSA,
	},
	{
		OID: "1.2.840.113549.1.1.1", Algorithm: "RSA", KeyBits: 4096,
		Vulnerable: true, Replacement: FIPS204_ML_DSA,
	},
	{
		OID: "1.2.840.10045.2.1", Algorithm: "EC (P-256)", KeyBits: 256,
		Vulnerable: true, Replacement: FIPS203_ML_KEM,
	},
	{
		OID: "1.2.840.10045.2.1", Algorithm: "EC (P-384)", KeyBits: 384,
		Vulnerable: true, Replacement: FIPS203_ML_KEM,
	},
	{
		OID: "1.2.840.10040.4.1", Algorithm: "DSA", KeyBits: 2048,
		Vulnerable: true, Replacement: FIPS204_ML_DSA,
	},
	{
		OID: "1.3.14.3.2.26", Algorithm: "SHA-1", KeyBits: 0,
		Vulnerable: true, Replacement: FIPS205_SLH_DSA,
	},
}

// Lookup returns the NIST replacement for a given algorithm name.
func Lookup(algorithm string) (NISTStandard, bool) {
	for _, entry := range OIDDatabase {
		if entry.Algorithm == algorithm && entry.Vulnerable {
			return entry.Replacement, true
		}
	}
	return NISTStandard{}, false
}
