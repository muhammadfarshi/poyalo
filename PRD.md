# PRD.md — POYALO Product Requirements Document

> **Document Version:** 2.0.0 (Comic Story Box & "Little UAE" 3D Game Edition)  
> **Target Release:** POYALO MVP (PWA Hackathon Edition)  
> **Status:** APPROVED FOR IMPLEMENTATION PLANNING  

---

## 1. Problem Statement & Objectives

### 1.1 The Problem
1. **Unchecked Planning Chaos:** AI travel planners hallucinate opening hours, schedule visits on closed days, and ignore transit physics and passport entry rules.
2. **Dry, Passive Historical Content:** Travelers ignore long walls of text; standard audio guides are monotonous and lack visual wit.
3. **Passive, Isolated Mobile Experiences:** Travel apps lack fun, real-time social presence, and interactive gamified exploration.

### 1.2 Core Objectives
- Deliver a **deterministic Reality Check engine** that audits itineraries in <200ms.
- Deliver a **Comic-Book Story Box** that renders place history as an illustrated, multi-panel graphic novel with 4 interactive tones.
- Deliver **"Little UAE"**, a lightweight browser-based 3D exploration and real-life social game where players explore stylized UAE districts, collect cultural artifacts, and interact with other real travelers in real-time.
- Ensure **100% offline functionality** for planning and comic storytelling via PWA Service Worker and IndexedDB.

---

## 2. Functional Requirements (Epics)

### EPIC 1: Reality Check Engine (The Brain)
- **FR-1.1 Universal Plan Parsing:** Ingest plain text or structured JSON from WhatsApp or ChatGPT.
- **FR-1.2 Fuzzy POI Matching:** Jaro-Winkler match (>82%) against local dataset; unmatched marked as `Unverified`.
- **FR-1.3 Operating Hours & Closed Day Checks:** Deterministic comparison against verified open hours and weekly closed days.
- **FR-1.4 Transit Physics Audit:** Haversine distance divided by available time window; flags impossible speeds.
- **FR-1.5 Environmental Awareness:** SunCalc golden-hour snap for viewpoints; Open-Meteo rain clash detection for outdoor stops.
- **FR-1.6 Itinerary Health Score:** 0–100 score with Roast/Professor commentary.
- **FR-1.7 One-Tap Auto-Repair:** Resequences stops and swaps closed venues using nearest-neighbor optimization.
- **FR-1.8 Murphy Mode:** Red chaos trigger simulating real-world disruptions (rain, delays) with instant live replanning.

---

### EPIC 2: Comic-Book Story Box (The Heart — Upgraded)
- **FR-2.1 Multi-Panel Comic Layout:** Display place lore as a responsive 3-to-6 panel comic strip.
- **FR-2.2 Comic UI Components:**
  - Speech bubbles with directional speaker pointers.
  - Thought bubbles with cloud borders.
  - Monospace narrative captions (`"MEANWHILE, AT THE SOUK..."`).
  - Action sound decals (`"SWOOSH!"`, `"CLINK!"`, `"YALLA!"`).
  - Halftone / Ben-Day dot styling and bold black brutalist borders.
- **FR-2.3 Quad-Tone Comic Generator:**
  - `Professor Comic`: Detailed graphic novel with historical diagrams and dates.
  - `Storyteller Comic`: Atmospheric, cinematic graphic novel with dramatic captions.
  - `Roast Comic`: Satirical caricature comic poking fun at colonial absurdities and tourist traps.
  - `Kid Comic`: Playful cartoon strip with simple words and animal/object mascots.
- **FR-2.4 Era Layers:** 3 historical time periods per place that update character attire, scenery, and comic dialogue.
- **FR-2.5 Audio Accompaniment:** Synchronized comic panel highlighting with pre-cached audio narration.
- **FR-2.6 Citations:** Verified source chips (Wikipedia, Archives) embedded in the footer.

---

### EPIC 3: Entry Check (Visa & Border Rules)
- **FR-3.1 Passport Matrix:** Lookup nationality and destination; classify into Visa-Free, VoA, eVisa, or Visa Required.
- **FR-3.2 6-Month Expiry Rule:** Compare passport expiration with trip departure date; trigger red alert if $< 180\text{ days}$.
- **FR-3.3 Entry Officer View:** Check accommodations logged for all nights and presence of onward ticket.
- **FR-3.4 Offline Document Checklist:** Interactive offline checkbox tracker for required travel credentials.

---

### EPIC 4: "Little UAE" 3D Exploration & Social Web Game (The Play)
Inspired by lightweight browser exploration games (*"Little Kerala"*), adapted for the **UAE** with real human multiplayer interaction:
- **FR-4.1 3D Browser-Based World (Three.js / WebGL):**
  - Lightweight low-poly 3D world running directly in the browser PWA without app store installs.
  - Districts:
    - *District 1: Old Dubai & Al Fahidi Creek* (Barajeel wind towers, historic alleyways, Abra boat dock, spice stalls).
    - *District 2: Golden Dunes Oasis* (Desert dunes, Bedouin tents, palm oasis).
- **FR-4.2 Dual Input Controller System:**
  - Desktop: Keyboard WASD movement + mouse drag-to-look camera.
  - Mobile Smartphone: Floating virtual joystick on left thumb + drag-to-look camera on right half of screen.
- **FR-4.3 Cultural UAE Collectibles:**
  - 15–20 low-poly collectible items placed across the 3D map:
    - Natural Pearls 🦪, Arabic Dallah Pots ☕, Medjool Dates 🌴, Falcon Feathers 🪶, Fanous Lanterns 🏮, Gold Coins 🪙.
  - Collision detection trigger: Walking over an item plays a celebratory sound chime, increments score, and unlocks a Cultural Lore Card.
- **FR-4.4 Cultural Collection Album:**
  - Displays unlocked cultural facts (e.g., *"How Dubai Creek pearl divers stayed underwater for 3 minutes"*).
- **FR-4.5 Real-Life Human Multiplayer Presence:**
  - **Live Player Avatars:** Shows other real humans exploring the same 3D district simultaneously via lightweight Supabase Realtime WebSocket presence channels.
  - **Proximity Emotes & Greetings:** Approaching another player enables proximity greeting pills: `"Marhaba! 👋"`, `"Yalla! 🚀"`, `"Take a photo! 📸"`.
  - **Live Emirate Leaderboard:** Real-time scoreboard aggregating points by district.
- **FR-4.6 Fast PWA Mobile Loading:**
  - Total 3D asset payload strictly $< 3\text{ MB}$.
  - Custom branded loading screen: *"Finding an oasis under the sun..."* with animated progress bar.

---

### EPIC 5: Local Services Marketplace
- **FR-5.1 Provider Directory:** Filterable listings of local guides and portrait photographers.
- **FR-5.2 Golden-Hour Sync:** Automatic pairing between SunCalc sunset stops and local photographers.
- **FR-5.3 Inquiry Flow:** 6-character booking code generation (`POY-842`) without traveler credit card walls.
- **FR-5.4 Provider PIN Portal:** 6-digit PIN login for providers to accept/decline inquiries.

---

## 3. Non-Functional Requirements (NFRs)

| ID | Category | Requirement Specification |
| :--- | :--- | :--- |
| **NFR-1** | **Offline PWA** | Itinerary planning, Reality Check rules, and Comic Story Boxes must function 100% in Airplane Mode. 3D game single-player mode operates from service worker cache. |
| **NFR-2** | **3D WebGL Performance** | Stable 50–60 FPS on mid-tier smartphones (iPhone 11+, Android Snapdragon 730+). WebGL context loss recovery. |
| **NFR-3** | **Asset Footprint** | Low-poly glTF models, Draco/meshopt compression, total initial 3D bundle $< 2.8\text{ MB}$. |
| **NFR-4** | **Multiplayer Latency** | Real-time presence updates broadcast at 10–12 Hz with smooth client-side linear interpolation (lerp). |
| **NFR-5** | **Privacy & Security** | Zero storage of passport numbers or biometric scans. Ephemeral multiplayer session IDs only. |
| **NFR-6** | **Smartphone Ergonomics** | All interactive controls $\ge 48\text{px} \times 48\text{px}$. Virtual joystick calibrated for one-thumb touch radius. |

---

## 4. Scope & MoSCoW Prioritization

```
+--------------------------------------------------------------------------+
| MUST HAVE (Tier 0 - Demo Essential)                                      |
| - Offline PWA Shell with Service Worker precaching                       |
| - Comic-Book Story Box with 4 Tones (incl. Roast) & Speech Bubbles       |
| - Reality Check Validation Engine (Hours, Transit, Weather, Daylight)    |
| - Murphy Mode Chaos Button with instant replanning                       |
| - Entry Check (Passport Matrix & 6-Month Expiry Rule)                    |
| - "Little UAE" 3D Browser World (Al Fahidi Creek district)               |
| - Mobile Virtual Joystick + Collectible Pearls/Dallahs with Score        |
+--------------------------------------------------------------------------+
| SHOULD HAVE (Tier 1 - Polish & Social)                                   |
| - Real-time Player Avatars & Proximity Emotes ("Marhaba! 👋") via Realtime|
| - Cultural Collection Album modal with unlocked UAE facts                |
| - Local Provider Directory with booking request codes                    |
| - Golden-Hour SunCalc photographer integration                           |
| - Shareable Boarding Pass & Game Score Card                              |
+--------------------------------------------------------------------------+
| COULD HAVE (Tier 2 - Delights)                                           |
| - District 2: Golden Dunes Desert Oasis map                              |
| - "Guilt Trip" carbon score with absurd local units                      |
| - Compass heading needle to nearest Story Box                            |
+--------------------------------------------------------------------------+
```
