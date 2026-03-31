// TokenService.java — Legacy Token Issuance Service
// WARNING: This file uses quantum-vulnerable cryptography.
// PQC-Atlas will flag these as HNDL Risk (Harvest Now, Decrypt Later).

import java.security.KeyPairGenerator;
import java.security.MessageDigest;
import java.security.Signature;
import javax.crypto.Cipher;

public class TokenService {

    // --- RSA-Legacy (CRITICAL) ---
    // Issues JWT signing keys using RSA-2048.
    // HNDL Risk: Shor's Algorithm breaks RSA on a sufficiently powerful quantum computer.
    public void generateRSAKey() throws Exception {
        KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
        kpg.initialize(2048);
        kpg.generateKeyPair();
    }

    // --- ECC-Legacy (CRITICAL) ---
    // ECDH key exchange for TLS session establishment.
    public void generateECKey() throws Exception {
        KeyPairGenerator kpg = KeyPairGenerator.getInstance("EC");
        kpg.initialize(256);
        kpg.generateKeyPair();
    }

    // --- DSA-Legacy (CRITICAL) ---
    // Audit trail signature for compliance records.
    public void generateDSAKey() throws Exception {
        KeyPairGenerator kpg = KeyPairGenerator.getInstance("DSA");
        kpg.initialize(1024);
        kpg.generateKeyPair();
    }

    // --- RSA Signature (CRITICAL) ---
    // Token signing using SHA256withRSA.
    public void signToken(byte[] data, java.security.PrivateKey key) throws Exception {
        Signature sig = Signature.getInstance("SHA256withRSA");
        sig.initSign(key);
        sig.update(data);
        sig.sign();
    }

    // --- RSA Cipher (CRITICAL) ---
    // Payload encryption using raw RSA.
    public void encryptPayload(byte[] data, java.security.PublicKey key) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        cipher.doFinal(data);
    }

    // --- MD5 (HIGH) ---
    // Legacy checksum for cache key generation.
    public String generateCacheKey(String input) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hash = md.digest(input.getBytes());
        return new String(hash);
    }

    // --- SHA-1 (MEDIUM) ---
    // Legacy fingerprint used in older API contracts.
    public String generateFingerprint(String input) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-1");
        byte[] hash = md.digest(input.getBytes());
        return new String(hash);
    }
}
