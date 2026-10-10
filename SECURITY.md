# SECURITY.md — POYALO Security & Privacy Policies

> **Security Posture:** Zero-Trust Client Model, Principle of Least Privilege, Privacy-by-Design  
> **Primary Rule:** Never store or transmit sensitive passport identification documents or client-side secrets.  

---

## 1. Threat Model & Security Posture

POYALO operates on a hybrid architecture: an offline-first PWA client with a Three.js 3D WebGL engine, serverless edge functions, and Supabase Realtime WebSockets.

```
[ UNTRUSTED PUBLIC CLIENT (Browser PWA / WebGL) ]
                |
        (HTTPS & WebSockets)
                v
[ EDGE REVERSE PROXY & REALTIME GATEWAY ]
  * WebSocket broadcast rate limiting (Max 15 msgs/sec)
  * XSS HTML sanitization on speech bubbles & emotes
  * Strict Content Security Policy (CSP)
                v
[ SERVERLESS EDGE FUNCTIONS & SUPABASE DB ]
  * GEMINI_API_KEY isolated to edge runtime
  * Game score validation & ceiling verification
  * Row Level Security (RLS) active on all tables
```

---

## 2. API Key & Credential Isolation

1. **Google Gemini API Key:** The `GEMINI_API_KEY` must never be present in client-side bundles. All comic script synthesis and itinerary text parsing pass through serverless edge routes.
2. **Supabase Secrets:** The client receives only the public `SUPABASE_ANON_KEY`. Administrative migrations use the `SUPABASE_SERVICE_ROLE_KEY` solely in server-side scripts.

---

## 3. Privacy & Sensitive Data Safeguards (The Passport Policy)

> [!CAUTION]
> **Zero Passport Scans:** POYALO is an itinerary and reality-checking tool, not a visa processing bureau.

1. **No Document Scans or Uploads:** The application does not accept or store photos, scans, or PDFs of passports, visas, national IDs, or airline tickets.
2. **Minimal Data Collection:** The Entry Check engine requires only Traveler Nationality (ISO code) and Passport Expiration Date.
3. **Local-Only Storage:** Passport expiration dates are stored exclusively inside the client's local `IndexedDB`. They are never transmitted to Supabase or third-party analytics.

---

## 4. Multiplayer WebSocket Security & Game Anti-Cheat

1. **Emote & Speech Bubble Sanitization:**
   - Real-time player emotes and proximity greetings are restricted to predefined enum strings (`"Marhaba! 👋"`, `"Yalla! 🚀"`, `"Coffee? ☕"`, etc.).
   - Custom chat text is passed through strict HTML entity encoding (`DOMPurify` / regex sanitization) before rendering inside floating comic speech bubbles to prevent XSS attacks.
2. **Broadcast Flooding & Rate Limiting:**
   - Realtime channels restrict client broadcasts to a maximum of 12 movement updates per second. Sockets exceeding this threshold are throttled.
3. **Game Score Tampering Prevention:**
   - When submitting final district scores to `/api/game/scores`, the backend validates that total submitted points do not exceed the theoretical maximum yield of all active map collectibles within the elapsed session duration.

---

## 5. Provider Security & PIN Authentication

1. **PIN Hashing:** Providers authenticate using a 6-digit PIN salted and hashed using `bcrypt` (cost factor 10).
2. **Contact Masking:** Personal contact details remain masked until the provider clicks "Accept Request" on their dashboard.
3. **Anti-Fake Reviews:** Reviews require a valid `booking_request_id` in `status: "completed"`.
