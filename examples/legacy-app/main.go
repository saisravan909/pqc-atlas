package main

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/md5"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha1"
	"fmt"
)

func generateRSAKey() {
	// RSA-2048 — flagged as CRITICAL: broken by Shor's Algorithm
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		panic(err)
	}
	fmt.Println("RSA key generated:", privateKey.PublicKey.N.BitLen(), "bits")
}

func generateECDSAKey() {
	// ECDSA P-256 — flagged as CRITICAL: broken by Shor's Algorithm
	privateKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		panic(err)
	}
	fmt.Println("ECDSA key generated on curve:", privateKey.Curve.Params().Name)
}

func hashWithMD5(data string) {
	// MD5 — flagged as HIGH: classically broken
	h := md5.New()
	h.Write([]byte(data))
	fmt.Printf("MD5 hash: %x\n", h.Sum(nil))
}

func hashWithSHA1(data string) {
	// SHA-1 — flagged as MEDIUM: deprecated
	h := sha1.New()
	h.Write([]byte(data))
	fmt.Printf("SHA-1 hash: %x\n", h.Sum(nil))
}

func main() {
	generateRSAKey()
	generateECDSAKey()
	hashWithMD5("sensitive-data")
	hashWithSHA1("sensitive-data")
}
