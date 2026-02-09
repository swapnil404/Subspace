# Subspace — Web App PRD

## 1. Overview

**Product:** Subspace
**Platform:** Web (Desktop & Mobile Web)
**Stage:** MVP → v1

Subspace is a secure, end‑to‑end encrypted real‑time messaging web application built with a zero‑knowledge server architecture. All cryptography is performed client‑side; the backend never has access to plaintext messages or private keys.

---

## 2. Problem

Many messaging apps marketed as “secure” rely on shared keys, server‑side encryption, or designs where the server can read user messages. These approaches fail to provide real end‑to‑end security and forward secrecy.

Subspace addresses this by implementing modern cryptography at the client edge, ensuring message confidentiality even if backend infrastructure is compromised.

---

## 3. Goals

### Primary Goals

* True end‑to‑end encrypted messaging
* Zero‑knowledge backend (server cannot decrypt messages)
* Simple onboarding with strong security guarantees
* Scalable, modern web architecture

### Success Metrics

* No plaintext message data stored or processed server‑side
* Reliable real‑time messaging between users
* Clear architectural differentiation from basic encrypted chat apps

---

## 4. Target Users

* General users seeking private and secure communication
* Small teams or communities requiring confidential messaging
* Developers evaluating modern E2EE system design

---

## 5. Accounts & Identity

### 5.1 User Accounts

* Users create an account with a **globally unique username**
* Authentication mechanism (email / OAuth / passkey) is abstracted from cryptographic identity

### 5.2 User ID

* Each user is assigned a **unique, immutable User ID**
* Used internally and for adding contacts
* Username is human‑readable; User ID is canonical

### 5.3 Cryptographic Identity

Generated client‑side on first login:

* Ed25519 identity key pair (signing)
* X25519 key pair (key exchange)

Private keys:

* Never leave the client
* Stored locally in browser storage (IndexedDB)

Public keys:

* Uploaded to the backend for discovery

---

## 6. Contacts & Discovery

* Users add contacts using the contact’s **User ID**
* Backend validates existence and returns public keys
* No phone numbers or emails are required or exposed

---

## 7. Messaging & Encryption

### 7.1 Encryption Model

* All encryption and decryption occurs client‑side
* Backend stores and forwards encrypted payloads only

### Cryptographic Stack

* Identity & signatures: **Ed25519**
* Key exchange: **X25519**
* Key derivation: **HKDF‑SHA256**
* Message encryption: **ChaCha20‑Poly1305**
* Forward secrecy: Per‑conversation key ratcheting (Double Ratchet inspired)

---

### 7.2 Message Flow

1. Sender encrypts message in the browser
2. Encrypted message is sent to backend
3. Backend stores encrypted blob
4. Receiver fetches encrypted message
5. Receiver decrypts message locally

At no point does the backend access plaintext content.

---

## 8. Core Features (MVP)

* Account creation & authentication
* One‑to‑one encrypted real‑time messaging
* Contact management (add by User ID)
* Message timestamps
* Delivery status (sent / delivered)
* Automatic key generation and session establishment

---

## 9. Explicit Non‑Goals (MVP)

* Group chats
* Media/file sharing
* Voice or video calls
* Multi‑device synchronization
* Push notifications

---

## 10. Backend Responsibilities

**Backend stack:** Hono (Vercel)

### Responsibilities

* Authentication
* User metadata storage
* Public key storage
* Encrypted message storage
* Message delivery via HTTP/WebSockets

### Non‑Responsibilities

* Encrypting messages
* Decrypting messages
* Generating or storing private keys

---

## 11. Data Model (High‑Level)

### Users

* id
* username
* public_keys
* created_at

### Messages

* id
* conversation_id
* sender_id
* ciphertext (bytea)
* nonce (bytea)
* created_at

No plaintext message fields exist.

---

## 12. Security Guarantees

* End‑to‑end encryption
* Forward secrecy
* Zero‑knowledge server
* No shared encryption keys

Threats mitigated:

* Server compromise
* Database leaks
* Passive network monitoring

---

## 13. UX & Interface Design

### UX Principles

* Security by default
* Minimal configuration
* Clear identity indicators
* Key‑change warnings

Users are never required to manually manage keys.

### UI Direction

* Discord‑like layout and interaction model
* Left sidebar for conversations and contacts
* Central message pane for active chat
* Right‑side context panel (future extensibility)

### UI Implementation

* Built with **shadcn/ui** components
* Consistent spacing, typography, and color tokens
* Keyboard‑first interactions
* Responsive for desktop and mobile web

---

## 14. Tech Stack

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

## 15. Future Enhancements

* Group chats
* Encrypted media sharing
* Disappearing messages
* QR‑based key verification
* Mobile applications (React Native)

---

## 16. Differentiation

Subspace differs from basic encrypted chat applications by providing:

* No shared secrets
* No server‑side encryption
* Cryptographic user identity
* Forward secrecy by default

It is designed as a security‑first messaging system, not a demonstration app.

---

## 17. Open Questions

* Final authentication provider selection
* Username length and validation rules
* Rate limiting and abuse prevention
  n
