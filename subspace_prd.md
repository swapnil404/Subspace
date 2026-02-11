# Subspace — Web App PRD

## 1. Executive Summary

**Product:** Subspace
**Platform:** Web (Desktop & Mobile Web)
**Stage:** MVP → v1

Subspace is a security‑first, open‑source, end‑to‑end encrypted (E2EE) real‑time messaging web application. It uses a **zero‑knowledge server architecture**: all cryptography is performed client‑side, and the backend never accesses plaintext messages or private keys.

The MVP focuses on **1:1 text messaging** with strong cryptographic guarantees, simple onboarding, and a modern real‑time web stack.

---

## 2. Problem Statement

Many messaging platforms claim to be secure but retain architectural weaknesses such as:

* Server‑side encryption or key handling
* Shared or static encryption keys
* Incomplete forward secrecy

These designs expose users to message compromise if backend infrastructure is breached.

Subspace addresses this by enforcing **client‑only cryptography**, **cryptographic user identity**, and **forward secrecy by default**, ensuring confidentiality even under total server compromise.

---

## 3. Goals & Non‑Goals

### 3.1 Primary Goals

* True end‑to‑end encrypted messaging
* Zero‑knowledge backend (no plaintext, no private keys)
* Forward secrecy for all conversations
* Simple onboarding with no manual key management
* Scalable real‑time web architecture

### 3.2 Success Metrics

* Backend stores only encrypted payloads and public metadata
* Messages reliably delivered in real time
* Clear, auditable cryptographic boundaries in codebase

### 3.3 Explicit Non‑Goals (MVP)

* Group chats
* Media / file sharing
* Voice or video calls
* Multi‑device sync
* Push notifications
* Message search

---

## 4. Target Users

* Privacy‑conscious individuals
* Small teams requiring confidential communication
* Developers and security engineers evaluating E2EE architectures

---

## 5. Identity & Authentication

### 5.1 User Account

* Users register with a **globally unique username**
* Authentication (email / OAuth / passkey) is **decoupled** from cryptographic identity
* Auth provider is replaceable without breaking cryptographic guarantees

### 5.2 User Identifier

* Each user is assigned a **unique, immutable User ID**
* User ID is canonical and used for:

  * Contacts
  * Conversations
  * Key discovery
* Username is mutable and human‑readable

---

## 6. Cryptographic Identity

### 6.1 Key Material (Client‑Side)

Generated on first authenticated session:

* **Ed25519** key pair (identity + signatures)
* **X25519** key pair (key exchange)

### 6.2 Private Keys

* Generated and stored **only on the client**
* Persisted in **IndexedDB**
* Never transmitted to the backend

### 6.3 Public Keys

* Uploaded to backend for discovery
* Versioned to support future key rotation

---

## 7. Contacts & Discovery

* Users add contacts via **User ID**
* Backend validates existence and returns public key bundle
* No phone numbers, emails, or social graph exposure

---

## 8. Messaging & Encryption

### 8.1 Encryption Model

* All encryption/decryption occurs client‑side
* Backend acts only as a message relay and encrypted blob store

### 8.2 Cryptographic Stack

* Identity & signatures: **Ed25519**
* Key exchange: **X25519**
* Key derivation: **HKDF‑SHA256**
* Symmetric encryption: **ChaCha20‑Poly1305**
* Forward secrecy: **Per‑conversation ratcheting** (Double Ratchet‑inspired)

### 8.3 Session Establishment

* Initial key exchange performed on first contact
* Session keys derived per conversation
* Keys are rotated automatically

---

## 9. Message Lifecycle

1. Sender encrypts message locally
2. Encrypted payload + metadata sent to backend
3. Backend stores encrypted blob
4. Backend notifies recipient via WebSocket
5. Recipient fetches and decrypts locally

**Backend never accesses plaintext at any stage.**

---

## 10. Core Features (MVP)

* Account creation & authentication
* One‑to‑one encrypted real‑time messaging
* Contact management (add by User ID)
* Message timestamps
* Delivery state: sent / delivered
* Automatic key generation and session management

---

## 11. Backend Responsibilities

**Backend Stack:** Hono (Vercel)

### Responsibilities

* Authentication handling
* User metadata storage
* Public key discovery
* Encrypted message persistence
* Real‑time delivery via WebSockets

### Explicit Non‑Responsibilities

* Encrypting messages
* Decrypting messages
* Generating, storing, or rotating private keys

---

## 12. Data Model (High‑Level)

### Users

* id
* username
* public_key_bundle
* created_at

### Conversations

* id
* user_a_id
* user_b_id
* created_at

### Messages

* id
* conversation_id
* sender_id
* ciphertext (bytea)
* nonce (bytea)
* created_at

**No plaintext or derived message content is stored.**

---

## 13. Security Guarantees

### Guaranteed

* End‑to‑end encryption
* Forward secrecy
* Zero‑knowledge backend
* Cryptographic user identity

### Threats Mitigated

* Server compromise
* Database leaks
* Passive network monitoring

### Out of Scope (MVP)

* Active MITM during first key exchange
* Compromised client devices

---

## 14. UX & Interface

### UX Principles

* Security by default
* No manual key management
* Clear identity and trust signals
* Explicit key‑change warnings

### UI Direction

* Discord‑like layout
* Left sidebar: contacts / conversations
* Center pane: messages
* Minimal, distraction‑free design

### UI Implementation

* **React + shadcn/ui**
* Keyboard‑first navigation
* Fully responsive web UI

---

## 15. Tech Stack

### Frontend

* Vite
* React
* shadcn/ui

### Backend

* Hono
* Vercel

### Database

* Neon PostgreSQL
* Drizzle ORM

### Monorepo

* Turborepo

### Cryptography

* libsodium (browser)

---

## 16. Open‑Source Strategy

* Fully open‑source core
* Public cryptographic review encouraged
* Clear separation of crypto, transport, and UI layers

---

## 17. Future Enhancements

* Group chats
* Encrypted media sharing
* Disappearing messages
* QR‑based key verification
* Multi‑device support
* Mobile apps (React Native)

---

## 18. Open Questions

* Final authentication provider
* Username rules and collision handling
* Abuse prevention and rate limiting
* Initial key verification UX
