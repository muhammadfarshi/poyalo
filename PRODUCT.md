# PRODUCT.md — POYALO Product Specification & Strategy

> **Project Name:** POYALO (*"Shall we go?"* in Malayalam — an evocative nod to spontaneous travel)  
> **Tagline:** *Every place has a comic story. Every plan gets a reality check. Every journey has a 3D world to explore.*  
> **Platform:** Mobile-First Progressive Web Application (PWA) with 100% Offline Capability & WebGL 3D Exploration  
> **Target Event:** Hackathon / Overnight Build & Demo (Calicut / Layover / TinkerHub Inspired — CCJ to DXB)  
> **Audience:** Independent Travelers, Culture Explorers, Group Trip Planners, Local Tour Guides & Creative Photographers  

---

## 1. Executive Summary & Thesis

Most travel apps suffer from fatal flaws:
1. **Generic AI Planners (The Hallucination Trap):** They spit out dream itineraries that look pretty on paper but place museum visits on Mondays when they are shuttered, pack 12 hours of transit into 2 hours, or ignore pouring monsoon rain and closed borders.
2. **Dry, Boring Tourism Content:** Historic sightseeing is passive and dry; traditional audio guides and wall plaques read like textbook excerpts.
3. **Lonely, Passive Digital Experiences:** Travel apps lack playfulness, community presence, and interactive discovery.

**POYALO solves this with three interconnected pillars:**
- **The Heart (Comic-Book Story Box):** Place storytelling reimagined as an interactive, AI-generated graphic novel / comic strip. Features dynamic comic panels, speech bubbles, sound decals, and a 4-way Tone Dial (Professor, Cinematic Storyteller, Savage Roast, Kid).
- **The Brain (Reality Check):** An uncompromising algorithmic validation engine that ingests any travel plan (AI-generated or messy chat pastes) and stress-tests it against opening hours, transit physics, weather, daylight, and passport/visa entry rules (Entry Check).
- **The Play & Real-Life Connection ("Little UAE" 3D Multiplayer Exploration Game):** A lightweight browser-based 3D exploration and social game set in the UAE (Old Dubai Creek, Al Fahidi, Desert Dunes). Players walk in a stylized low-poly environment, collect cultural items (pearls, dallah coffee pots, dates, falcon feathers), earn points, and **interact with real human players in real-time** via live avatars, proximity greetings, and shared leaderboards.

```
+-----------------------------------------------------------------------------------------+
|                                        POYALO PWA                                       |
+------------------------------+------------------------------+---------------------------+
|          THE HEART           |          THE BRAIN           |      THE PLAY & SOCIAL    |
|   (Comic-Book Story Box)     |       (Reality Check)        |       ("Little UAE" 3D)   |
+------------------------------+------------------------------+---------------------------+
| * Graphic novel comic panels | * Opening hours & closed day | * 3D browser-based world  |
| * Speech & thought bubbles   | * Transit speed & physics    | * Real human presence     |
| * 4 Comic Tone Dials (Roast) | * SunCalc golden-hour snap   | * Proximity greetings     |
| * Era Layers (Ancient->Now)  | * Rain & monsoon conflict    | * Collect UAE items       |
| * Monument Group Chats       | * Entry Check (Visa rules)   | * Cultural trivia unlock  |
| * 100% Offline PWA Pack      | * Murphy Mode chaos replan   | * Live Emirate scores     |
+------------------------------+------------------------------+---------------------------+
                                              |
                                              v
+-----------------------------------------------------------------------------------------+
|                               LOCAL SERVICES MARKETPLACE                                |
|        * Curated Guides (Story Curators)    * Golden-Hour Photographers                 |
|        * Zero-commission request flow       * Verified badges via Admin                 |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Product Positioning & The CCJ $\to$ DXB Travel Narrative

The hackathon theme connects **CCJ (Kozhikode/Kerala)** with **DXB (Dubai/UAE)** — the historic maritime spice and trade corridor. POYALO captures this exact bridge:
- **Phase 1 Destination & Lore:** Kerala's historic ports (Fort Kochi & Kozhikode) with colonial trade lore, Chinese fishing nets, and spice routes.
- **Phase 2 Destination & Interactive Game:** **The UAE (Dubai / Abu Dhabi / Sharjah)**, featuring the 3D exploration game *"Little UAE"*, celebrating pearl diving heritage, old souks, desert dunes, and futuristic skylines.

---

## 3. Key Features & Specifications

### 3.1 Feature 1: Comic-Book Story Box (The Heart)
- **Visual Comic Strip Panels:** Instead of static walls of text, place history is rendered as a vibrant, neo-brutalist multi-panel comic strip (3 to 6 responsive panels).
- **Comic Book UI Aesthetics:**
  - Crisp black panel borders (`2.5px solid #111827`) with hard offset drop shadows (`4px 4px 0px #111827`).
  - Halftone / Ben-Day dot background accents.
  - Authentic speech bubbles with directional tails, thought clouds, and monospace narrative caption blocks (`"MEANWHILE, AT DUBAI CREEK IN 1902..."`).
  - Dynamic sound effect stickers (`"SWOOSH!"`, `"CLINK!"`, `"BOOM!"`, `"YALLA!"`).
- **Tone Dial Comic Variants:**
  - *Professor Comic:* Historical graphic novel with accurate archival maps, dates, and architectural schematics.
  - *Storyteller Comic:* Cinematic, dramatic graphic novel with high-contrast noir lighting and emotional prose.
  - *Roast Comic:* Satirical political cartoon exposing tourist traps, ridiculous colonial laws, and historical absurdities.
  - *Kid Comic:* Playful Saturday-morning cartoon strip with friendly character mascots and ELI5 analogies.
- **Era Layers:** Step through 3 distinct time periods per location, witnessing the visual and architectural evolution of the comic strip scene.
- **Offline City Pack:** 1-tap download caches all comic panels, dialogue scripts, and audio clips into IndexedDB for 100% airplane-mode operation.

### 3.2 Feature 2: Reality Check & Murphy Mode (The Brain)
- **Universal Input:** Users can generate an itinerary via AI or paste raw, unformatted text from WhatsApp group chats or travel notes.
- **Deterministic 9-Point Audit:** Code-based rules evaluate opening hours, closed days, transit speeds, SunCalc golden-hour alignment, weather forecasts, meal intervals, and passport/visa entry rules.
- **One-Tap Auto-Repair:** Automatically reorganizes stops using nearest-neighbor optimization, replaces closed venues, and snaps scenic viewpoints to sunset.
- **Murphy Mode (Chaos Button):** Injects real-world disruptions (e.g., flight delay, sudden rain, emergency closure) and live-reflows the itinerary.
- **Entry Check (The Visa Guy Layer):** Ingests nationality and passport expiry date; checks against the international passport matrix (visa-free, VoA, eVisa, visa required); raises red alerts if passport validity is under 180 days.

### 3.3 Feature 3: "Little UAE" 3D Exploration & Social Web Game (The Play)
Inspired by lightweight browser exploration games (*"Little Kerala — Play for Your District"*), but adapted for the **UAE**:
- **Lightweight Browser 3D World (Three.js / WebGL):**
  - Runs directly inside the browser PWA on smartphones with zero app installation.
  - Stylized low-poly environment featuring iconic UAE zones:
    - **District 1 (Old Dubai):** Al Fahidi Historical Neighborhood, wind-tower houses (Barajeel), Dubai Creek with traditional Abra boats, and the historic spice souk.
    - **District 2 (Desert & Dunes):** Golden hour desert dunes, Bedouin tents, and campfire oases.
    - **District 3 (Modern Skyline):** Sleek architectural towers and promenade plazas.
- **Character Movement & Touch Controls:**
  - Desktop: Keyboard WASD + mouse drag-to-look camera.
  - Mobile: On-screen virtual joystick + single-finger drag camera rotate.
- **Cultural Themed Collectibles:**
  - Collect authentic UAE heritage items scattered across the 3D map:
    - 🦪 *Natural Pearls* (Honoring the Arabian Gulf diving heritage).
    - ☕ *Arabic Dallah & Finjan* (Traditional hospitality coffee pots).
    - 🌴 *Medjool Dates* (The fruit of the desert).
    - 🪶 *Falcon Feathers* (National emblem of swiftness and honor).
    - 🏮 *Fanous Lanterns* (Heritage ambient night lighting).
    - 🪙 *Historic Dirham / Trade Coins*.
- **Collection Album & Cultural Lore Unlock:**
  - Walking over an item plays a celebratory particle chime and awards points.
  - Touching an item unlocks a short, fascinating cultural story card in the player's passport album.
- **Real-Life Human Interaction & Multiplayer Presence:**
  - **Live Player Avatars:** See other real human travelers exploring the same 3D district in real-time (powered by Supabase Realtime / WebSockets).
  - **Proximity Greetings & Emotes:** Walk up to another real player to trigger quick emote stickers above your avatar: `"Marhaba! 👋"`, `"Yalla! 🚀"`, `"Coffee? ☕"`, `"Selfie! 📸"`.
  - **Shared Emirate Leaderboard:** Compete and cooperate with real travelers to boost your district's cultural collection score.

### 3.4 Feature 4: Local Services Marketplace
- **Unified Provider Engine:** Connects verified local guides and photographers.
- **Golden-Hour Photographers:** Direct link between SunCalc sunset stops and local portrait photographers.
- **Curator Flywheel:** Guides verify local comic story packs and fact-checks to earn ranking boosts.
- **Zero-Friction Inquiries:** Travelers book with a 6-character request code (`POY-842`) without credit card barriers.

---

## 4. The 3-Minute Demo Pitch Choreography

| Time | Scene | Wow Factor |
| :--- | :--- | :--- |
| **0:00 – 0:20** | Hook: *"Every place has a comic story. Every plan gets a reality check."* Show PWA install on mobile. | Instant PWA launch |
| **0:20 – 0:50** | Paste messy WhatsApp itinerary. Score drops to 42. Flags pop in Roast tone. Tap **Auto-Repair**; score jumps to 94. | Instant deterministic validation |
| **0:50 – 1:15** | Tap red **Murphy Mode** button: Monsoon rain hits. Outdoor stop swaps for indoor heritage museum. | Real-time replanning |
| **1:15 – 1:45** | Switch phone to **AIRPLANE MODE**. Open Story Box: reveal the **Comic Book Strip** with speech bubbles & Roast tone. | Graphic novel aesthetic + 100% offline |
| **1:45 – 2:25** | Launch **"Little UAE" 3D Game** in browser. Walk around Al Fahidi Creek. Collect a diving pearl; cultural fact unlocks. **Another real player avatar walks by**; send a `"Marhaba! 👋"` emote. | Lightweight 3D on phone + live human presence |
| **2:25 – 2:50** | Navigate to Services. Book local golden-hour photographer Faizal; show request code `POY-842`. | Working marketplace |
| **2:50 – 3:00** | Close: CCJ to DXB bridge, social boarding pass with QR code and stamps. | Compelling travel narrative |
