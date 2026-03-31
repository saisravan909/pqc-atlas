# auth_service.py — Legacy Authentication Service
# WARNING: This file uses quantum-vulnerable cryptography.
# PQC-Atlas will flag these as HNDL Risk (Harvest Now, Decrypt Later).

from cryptography.hazmat.primitives.asymmetric import rsa, ec, dsa
from cryptography.hazmat.backends import default_backend
import hashlib

# --- RSA-Legacy (CRITICAL) ---
# Generates a 2048-bit RSA private key for JWT token signing.
# HNDL Risk: A quantum adversary can harvest encrypted tokens today
# and decrypt them once a cryptographically-relevant quantum computer (CRQC) exists.
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
    backend=default_backend()
)

# --- ECC-Legacy (CRITICAL) ---
# Used for ECDHE session key exchange in the TLS handshake.
ec_key = ec.generate_private_key(
    curve=ec.SECP256R1(),
    backend=default_backend()
)

# --- DSA-Legacy (CRITICAL) ---
# Legacy code path used for audit log signing.
dsa_params = dsa.generate_parameters(
    key_size=1024,
    backend=default_backend()
)

# --- MD5 (HIGH) ---
# Used for password hashing. Classically broken, quantum-weakened.
def hash_password(password: str) -> str:
    return hashlib.md5(password.encode()).hexdigest()

# --- SHA-1 (MEDIUM) ---
# Used for legacy session token generation.
def generate_token(seed: str) -> str:
    return hashlib.sha1(seed.encode()).hexdigest()
