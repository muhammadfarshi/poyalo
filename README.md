# POYALO (പോയാലോ?)

> *"Every place has a comic story. Every plan gets a reality check. Every journey has a 3D world to explore."*

[![Platform](https://img.shields.io/badge/Platform-Mobile--First%20PWA-1B3FFF?style=flat-square)](https://github.com/nichroot/poyalo)
[![Architecture](https://img.shields.io/badge/Architecture-Offline--First%20%2B%20WebGL-FF5722?style=flat-square)](./ARCHITECTURE.md)
[![UI Style](https://img.shields.io/badge/UI-Neo--Brutalist%20Comic%20Strips-FBBF24?style=flat-square)](./DESIGN_SYSTEM.md)
[![License](https://img.shields.io/badge/License-MIT-111827?style=flat-square)](#license)

**POYALO** (*"Shall we go?"* in Malayalam) is an offline-first travel companion Progressive Web Application (PWA). Designed around the historic **CCJ (Kozhikode/Kerala) $\to$ DXB (Dubai/UAE)** maritime trade and cultural corridor, POYALO transforms travel planning from passive, hallucinating text feeds into an interactive, graphic-novel adventure with deterministic itinerary verification and in-browser 3D multiplayer world exploration.

---

## 🧭 Why POYALO?

| Current Travel Apps | The POYALO Way |
| :--- | :--- |
| **Hallucinating AI Planners:** Spit out pretty schedules that put closed museums on Mondays, ignore 4-hour traffic bottlenecks, and overlook visa expiry rules. | **Deterministic Reality Check:** Code-based rules validate hours, transit physics, solar golden hours, weather, and passport validity in <200ms. |
| **Dry, Boring Tourism History:** Endless walls of dry Wikipedia text and dull plaque audio guides that travelers ignore. | **Comic-Book Story Box:** History rendered as vibrant multi-panel graphic novel strips with speech bubbles, era sliders, and 4 distinct tone dials. |
| **Lonely, Passive Mobile Tools:** Traditional travel apps are utilitarian spreadsheets with zero social playfulness. | **"Little UAE" 3D Social World:** In-browser Three.js exploration where travelers collect cultural artifacts and interact with real players in real time. |

---

## ⚡ The Three Core Pillars

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
|        * Zero-commission direct connect     * Verified local badges                     |
+-----------------------------------------------------------------------------------------+
```

### 1. 🎨 The Heart: Comic-Book Story Box
Transforms place lore into responsive, multi-panel graphic novel strips:
- **Neo-Brutalist Comic UI:** Hard black panel borders (`2.5px solid #111827`), offset drop shadows (`4px 4px 0px #111827`), speech bubbles with directional pointers, narrative caption blocks, and dynamic sound decals (`"SWOOSH!"`, `"YALLA!"`).
- **4-Way Tone Dial:**
  - 🎓 **Professor Comic:** Archival schematics, trade maps, and rigorous dates.
  - 🎬 **Storyteller Comic:** Cinematic, dramatic noir lighting and emotional character prose.
  - 🔥 **Roast Comic:** Satirical caricature exposing tourist traps and colonial absurdities.
  - 🧒 **Kid Comic:** Playful Saturday-morning cartoon strips with friendly mascots.
- **Era Layers:** Step through 3 distinct time periods per landmark to witness architectural and cultural evolution.
- **100% Offline City Pack:** Download once to IndexedDB for zero-connectivity airplane mode reading.

### 2. 🧠 The Brain: Reality Check & Entry Check
- **Deterministic 9-Point Audit:** Algorithms audit plans for operating hours, weekly closures, transit speed sanity, SunCalc golden-hour photo alignment, and rainfall clashes.
- **One-Tap Auto-Repair:** Nearest-neighbor resequencing of stops and instant replacement of closed venues.
- **Murphy Mode (Chaos Button):** Injects real-world disruptions (sudden downpour, flight delays, emergency venue maintenance) with instant real-time re-routing.
- **Entry Check (The Visa Guy Engine):** Evaluates traveler nationality against destinations, enforcing the 6-month passport validity invariant ($< 180\text{ days}$ alert) and visa categories (Visa-Free, VoA, eVisa, Visa Required).

### 3. 🕹️ The Play: "Little UAE" 3D Web Exploration
- **In-Browser WebGL Exploration (Three.js):** Runs instantly in modern smartphone and desktop browsers with zero app installation.
- **Stylized Low-Poly Districts:**
  - *District 1 (Old Dubai):* Al Fahidi Historical Neighborhood, Barajeel wind towers, Dubai Creek, and traditional wooden Abra boats.
  - *District 2 (Desert & Dunes):* Golden-hour dunes, Bedouin tents, and campfire oases.
  - *District 3 (Modern Promenade):* Futuristic skyline plazas and architectural monuments.
- **Cultural Themed Collectibles:** Collect natural Arabian Gulf pearls 🦪, Arabic dallahs ☕, Medjool dates 🌴, falcon feathers 🪶, fanous lanterns 🏮, and trade coins 🪙 to unlock trivia in your digital passport.
- **Real-Time Multiplayer Presence:** Built on Supabase Realtime WebSockets—see live traveler avatars exploring the district, broadcast proximity greetings (`"Marhaba!"`, `"Yalla!"`), and climb the district leaderboard.

### 4. 🤝 Community: Local Story Curators & Photographers
- **Direct Marketplace:** Connects independent travelers directly with vetted local heritage guides and golden-hour photographers.
- **Zero Platform Commission:** Travelers contact curators directly without fees or markups.

---

## 🎨 Visual Identity & Design System

POYALO's aesthetic is rooted in **Retro Neo-Brutalist Boarding Passes & Comic-Book Graphic Novels**:

- **Palette Tokens:**
  - 🔵 **Layover Blue** (`#1B3FFF`): Hero brand color, active highlights, primary action buttons.
  - 🟠 **Jet Orange** (`#FF5722`): Boarding pass borders, departure badges, warning banners.
  - 🟡 **Comic Gold** (`#FBBF24`): Caption blocks, collectibles, golden-hour alerts.
  - ⬛ **Deep Ink Black** (`#111827`): Heavy borders (`2.5px`), high-contrast ink typography, flat drop shadows.
  - 📜 **Canvas Cream** (`#FDFBF7`): Warm paper background for reading comfort.
- **Shadow Invariant:** Crisp, flat shadows (`4px 4px 0px #111827`) — **never soft or blurry**.
- **Mobile-First Ergonomics:** Designed from 375px smartphones upward with vertical perforated ticket tears, touch joysticks, and floating action docks.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18+](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/) |
| **Styling & Design** | [Tailwind CSS](https://tailwindcss.com/) (Brutalist presets) + [Lucide Icons](https://lucide.dev/) |
| **3D Engine** | [Three.js](https://threejs.org/) (WebGL, Low-Poly glTF models, Virtual Joystick) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) (Modular stores: plan, comic, game, provider) |
| **Offline Storage** | [Dexie.js](https://dexie.com/) (IndexedDB wrapper) + [Workbox PWA](https://developer.chrome.com/docs/workbox) |
| **Algorithms** | [SunCalc](https://github.com/mourner/suncalc) (Solar position), Haversine (Distance), Jaro-Winkler (Fuzzy POI) |
| **Realtime & Backend** | [Supabase](https://supabase.com/) (PostgreSQL, Realtime WebSockets for 3D presence) |
| **AI Synthesis** | [Google Gemini API](https://ai.google.dev/) (Flash models, strictly serverless edge execution) |

---

## 📂 Project Architecture & Specifications

Detailed documentation is organized across specialized specifications:

- 📋 [**PRODUCT.md**](./PRODUCT.md) — Product strategy, user personas, CCJ $\to$ DXB narrative, and feature epics.
- 📐 [**PRD.md**](./PRD.md) — Product Requirements Document with acceptance criteria and success metrics.
- 🏗️ [**ARCHITECTURE.md**](./ARCHITECTURE.md) — Component topology, offline caching layers, and Three.js runtime.
- ⚙️ [**TRD.md**](./TRD.md) — Technical Requirements Document, algorithms, and data structures.
- 🎮 [**GAME_SPEC.md**](./GAME_SPEC.md) — "Little UAE" 3D mechanics, collectible spawning, and multiplayer presence.
- 🎨 [**DESIGN_SYSTEM.md**](./DESIGN_SYSTEM.md) — Neo-brutalist tokens, comic components, and typography rules.
- 🔌 [**API.md**](./API.md) — Edge function endpoints, payload schemas, and error codes.
- 🗄️ [**DATABASE.md**](./DATABASE.md) — Supabase PostgreSQL schema, RLS policies, and IndexedDB stores.
- 🔒 [**SECURITY.md**](./SECURITY.md) — Zero-sensitive passport storage policies and Content Security Policy.
- 🧪 [**TESTING.md**](./TESTING.md) — Vitest reality check suites and WebGL memory leak tests.
- 🤖 [**AGENTS.md**](./AGENTS.md) — Architectural rules and invariants for autonomous AI coding agents.
- 🗺️ [**IMPLEMENTATION_PLAN.md**](./IMPLEMENTATION_PLAN.md) — Phased hackathon delivery roadmap.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Local Development Setup
```bash
# Clone the repository
git clone https://github.com/nichroot/poyalo.git
cd poyalo

# Install dependencies (once project scaffold is initialized)
npm install

# Start the development server
npm run dev
```

### Environment Configuration
Create a `.env.local` file based on `.env.example`:
```ini
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
> **Security Note:** The `GEMINI_API_KEY` is strictly confined to serverless edge functions and is never bundled in the client application.

---

## 🗺️ CCJ $\to$ DXB Route Lore

POYALO honors the historic sea lanes connecting Kerala's Malabar coast to the Arabian Gulf:
1. **Malabar Spice Ports (Phase 1):** Kozhikode beach, Beypore uru shipbuilders, and Fort Kochi trading outposts.
2. **The Emirates Heritage (Phase 2):** Dubai Creek, Al Fahidi wind towers, Arabian Gulf pearl divers, and desert caravan routes.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE) — see the LICENSE file for details.
