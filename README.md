# POYALO (പോയാലോ?)

> *"Every place has a comic story. Every plan gets a reality check. Every journey has a 3D world to explore."*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-poyaloo.vercel.app-1B3FFF?style=for-the-badge&logo=vercel)](https://poyaloo.vercel.app)
[![Platform](https://img.shields.io/badge/Platform-Mobile--First%20PWA-10B981?style=for-the-badge&logo=pwa)](https://poyaloo.vercel.app)
[![Engine](https://img.shields.io/badge/3D%20Engine-Three.js%20WebGL-FF5722?style=for-the-badge&logo=three.js)](https://threejs.org)
[![UI Style](https://img.shields.io/badge/UI-Neo--Brutalist%20Comic%20Strips-FBBF24?style=for-the-badge)](./DESIGN_SYSTEM.md)
[![License](https://img.shields.io/badge/License-MIT-111827?style=for-the-badge)](#license)

**POYALO** (*"Shall we go?"* in Malayalam) is an offline-first, story-driven travel companion Progressive Web Application (PWA). POYALO pairs graphic-novel lore, deterministic client-side itinerary validation, immigration compliance automation, and an interactive 3D WebGL exploration world.

The app starts with a **neutral Worldwide state**—free from pre-selected destinations—ready to plan, debunk myths, and explore any city across the globe.

---

## 🌐 Live Production

- **Production URL:** [https://poyaloo.vercel.app](https://poyaloo.vercel.app)
- **GitHub Repository:** [https://github.com/nichroot/poyalo](https://github.com/nichroot/poyalo)
- **Installable PWA:** Open on iOS Safari ("Add to Home Screen") or Android Chrome ("Install App") for a native, offline-capable experience.

---

## 🧭 Why POYALO?

| Traditional Travel Apps | The POYALO Advantage |
| :--- | :--- |
| **Hallucinating AI Planners:** Spit out schedules that place closed museums on Mondays, ignore traffic bottlenecks, and overlook passport validity rules. | **Deterministic Client Verification:** Code-based rules validate operating hours, transit physics, solar golden hours, and passport rules locally in <200ms. |
| **Dry Wikipedia Text Walls:** Long, boring tourism text and monotonous audio guides that travelers skip. | **Comic-Book Story Box:** History rendered as multi-panel graphic novel strips with speech bubbles, 4 tone dials, and era time travel. |
| **Fragmented Visa Anxiety:** Confusing government portals, surprise airline boarding denials, and 6-month passport traps. | **The Visa Guy Suite:** 180-Day Passport Expiry Widget, reactive Boarding Pass with official security seal, Visa Matcher, and 30s Stress Quiz. |
| **Passive Spreadsheets:** Boring utilitarian apps with zero visual delight or spatial immersion. | **"VG World" 3D WebGL:** In-browser Three.js sandbox with virtual touch joystick, GPS radar landmark search, rotating Ain Dubai, and hidden chests. |

---

## ⚡ Core Feature Modules

```
+---------------------------------------------------------------------------------------------------+
|                                            POYALO PWA                                             |
+---------------------------------+---------------------------------+-------------------------------+
|         PLAN & VERIFY           |         STORY & CULTURE         |        3D WORLD & PLAY        |
+---------------------------------+---------------------------------+-------------------------------+
| * POYALO AI Multi-Day Planner   | * Comic-Book Story Box          | * VG World (320m x 320m)      |
| * SunCalc Golden Hour Physics   | * 4 Tone Dials (Roast/Kid/etc.) | * Mobile Virtual Joystick     |
| * 180-Day Passport Expiry Widget| * Era Time Machine Slider       | * Place Search & GPS Radar    |
| * Reactive Boarding Pass Studio | * Web Speech Audio Narration    | * Rotating Ain Dubai Wheel    |
| * Visa Compatibility Matcher    | * Cultural Myth Pointer         | * Spice Souk & Miracle Oasis  |
| * 30-Second Visa Stress Quiz    | * "Suggest Myth to Admin" Modal | * Bedouin Camp & Jump Pads    |
| * Neutral Worldwide State       | * All Worldwide Aggregator      | * Day/Sunset/Night Atmosphere |
+---------------------------------+---------------------------------+-------------------------------+
```

### 1. 🤖 POYALO AI Multi-Day Itinerary Planner
- **Global Destination Support:** Prompts for any destination worldwide (e.g., *"3 days in Tokyo"*, *"Weekend in Paris"*, *"4 days in Rome"*, *"Dubai Heritage Trail"*).
- **Multi-Day Sequencing:** Dynamically structures trips across Day 1, 2, 3, 4, 5 tabs with morning, afternoon, sunset, and night stops.
- **Deterministic Transit & Golden Hour Physics:** Computes estimated travel times between consecutive stops and aligns scenic spots with solar golden hour windows via SunCalc.
- **Embedded Comic Lore:** Direct launcher box linking any generated day into the Comic-Book Story Box.

### 2. 🎨 Comic-Book Story Box
- **Graphic Novel Visuals:** Hard black borders (`2.5px solid #111827`), offset brutalist drop shadows (`4px 4px 0px #111827`), speech bubbles with directional tail pointers, narrative captions, and comic sound decals (`"SWOOSH!"`, `"YALLA!"`, `"KAPOW!"`).
- **4-Way Tone Dial:**
  - 🎓 **Professor:** Archival schematics, trade history, and rigorous chronological facts.
  - 🎬 **Storyteller:** Cinematic prose, dramatic noir lighting, and character-driven drama.
  - 🔥 **Roast:** Witty satire exposing tourist traps, overhyped queues, and cultural ironies.
  - 🧒 **Kid:** Fun Saturday-morning cartoon strips with adventurous mascots.
- **Era Time Machine:** Shift between Ancient / Heritage, Mid-Century / Golden Era, and Modern / Cyber eras to see how landmarks evolved.
- **Audio Narration Player:** Web Speech API synthesis coupled with Web Audio effects reads comic panels aloud with character voice modulation.
- **Multi-Day Continuity:** Supports multi-day story progression so Day 1, 2, and 3 each reveal distinct narrative arcs.

### 3. 💡 Cultural Myth Pointer & Admin Suggestion Modal
- **Worldwide Myth Debunking:** Unpacks travel myths vs local realities across Dubai, Tokyo, Paris, Rome, Bangkok, New York, and worldwide destinations.
- **Categorized Insight Chips:** Cultural, Financial, Culinary, Social, and Historical.
- **Neutral Aggregator:** View all worldwide myths simultaneously or filter by specific cities with a single tap.
- **"Suggest Myth to Admin" Modal:** Allows travelers to submit new local myths directly to the platform via a 3-field modal (Place Name, Category, Myth Content) with instant local persistence and queued admin review.

### 4. 🛡️ The Visa Guy Suite (Immigration & Compliance)
- **180-Day Passport Expiry Home Screen Widget:**
  - Glanceable mobile card evaluating the strict international 6-month passport validity invariant.
  - Visual color-coded validity meter, live days countdown, and copyable advisory text.
  - One-tap sync with the Boarding Pass.
- **Interactive Boarding Pass Studio:**
  - Neo-brutalist flight card with mobile vertical tear line, circular punch notches, and barcode decals.
  - Real-time editable passenger name, origin, destination, seat, flight number, and date.
  - **Official 180-Day Immigration Security Seal:** Dynamically stamps `PASSPORT COMPLIANT (180+ DAYS)` with verified green badge.
- **Visa Compatibility Matcher:**
  - Cross-selling travel matcher: enter UAE residency and passport nationality to categorize global destinations into:
    - 🟢 *Visa-Free*
    - 🟡 *Visa on Arrival*
    - 🔵 *eVisa Support Available*
    - 🔴 *Pre-Arranged Visa Required*
  - Instant one-tap WhatsApp concierge routing for expedited document processing.
- **30-Second Visa Stress Quiz:**
  - Playful 5-step quiz measuring deadline pressure, past rejections, missing documents, appointment availability, and itinerary complexity.
  - Computes a **Visa Stress Score (0–100)** with actionable triage recommendations (from *Chill Cruiser* to *Code Red Emergency*).

### 5. 🕹️ "VG World" 3D WebGL Exploration
- **In-Browser Three.js Engine:** Zero plugin or installation requirements; loads instantly on mobile and desktop browsers.
- **Smartphone Touch Ergonomics:**
  - **Virtual Touch Joystick:** 128px outer base, 56px thumb target ($\ge 48\text{px}$ invariant), 8px dead zone, active glow scaling, and 4-way directional indicators (▲▼◀▶).
  - Dedicated touch-look drag area for seamless 360° camera orbit.
- **Vast $320\text{m} \times 320\text{m}$ World Map:**
  - 🎡 **Ain Dubai Observation Wheel:** Giant rotating steel wheel with revolving passenger capsules.
  - 🏮 **Spice & Gold Souk:** Bustling marketplace with colorful awnings, vendor stalls, and illuminated hanging lanterns.
  - 🌴 **Miracle Oasis:** Shaded desert oasis with palm groves and an animated water fountain.
  - ⛺ **Bedouin Desert Camp:** Authentic majlis carpets, patterned bedouin tents, and a glowing campfire.
  - 🏛️ **Heritage District & Wind Towers:** Al Fahidi coral stone architecture and Barajeel ventilation towers.
  - 🏙️ **Modern Skyscraper Plaza:** Futuristic high-rise towers.
  - ⚡ **Bounce / Jump Pads:** High-velocity spring pads that launch players into the air for panoramic aerial views.
  - 🎁 **Hidden Treasure Chests:** Interactive chests with spatial audio and collectible cultural artifacts (pearls, dallahs, trade coins).
  - 🌅 **Atmosphere Controller:** Real-time toggle between Day, Sunset, and Night lighting with dynamic sun/moon positioning and fog.
- **Place Search & GPS Radar Modal:**
  - In-game GPS radar listing all landmarks with real-time Euclidean distance.
  - Instant fuzzy search across world landmarks.
  - **"Pin Waypoint":** Drops a vertical glowing 3D beacon with pulsing ground rings and HUD distance tracking.
  - **"Teleport Now":** Instantly warps the player directly to the landmark.
- **VRAM Memory Integrity:** Scene traversal with recursive `.dispose()` on unmount guarantees zero mobile browser memory leaks.

### 6. ✈️ Interactive Easter Eggs
- **Airplane Shake Easter Egg:** Shake your phone to trigger a neo-brutalist jumbo jet flying diagonally across the screen with roaring contrails. Calibrated with a multi-shake threshold to prevent accidental triggers.

---

## 🎨 Visual Identity & Design Tokens

POYALO is designed with a **Retro Neo-Brutalist & Comic-Book** visual language:

- **Primary Colors:**
  - 🔵 **Layover Blue** (`#1B3FFF`): Hero brand color, navigation active states, action buttons.
  - 🟠 **Jet Orange** (`#FF5722`): Departure badges, alert banners, boarding pass accents.
  - 🟡 **Comic Gold** (`#FBBF24`): Speech bubbles, collectibles, golden-hour indicators.
  - ⬛ **Deep Ink Black** (`#111827`): Heavy borders (`2.5px`), high-contrast typography, crisp drop shadows.
  - 📜 **Canvas Cream** (`#FDFBF7`): Warm paper background for long reading sessions.
- **Shadow Invariant:** Hard, flat, offset shadows (`4px 4px 0px #111827`) — **strictly zero soft blurry shadows**.
- **Mobile First:** Designed from 375px screens upward with minimum 48px touch targets.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/) |
| **Package Manager / Runtime** | [Bun](https://bun.sh/) & [Node.js](https://nodejs.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (Custom brutalist preset) + [Lucide React](https://lucide.dev/) |
| **3D WebGL Engine** | [Three.js](https://threejs.org/) (Custom low-poly procedural geometries, shaders & materials) |
| **Calculations & Algorithms** | [SunCalc](https://github.com/mourner/suncalc) (Golden hour solar geometry), Euclidean distance vectors |
| **Audio Synthesis** | Web Audio API (Synthesizer sound decals) + Web Speech API (Narration synthesis) |
| **Persistence & PWA** | LocalStorage + Service Worker PWA Caching |
| **AI Integration** | POYALO AI Client Architecture |
| **Deployment** | [Vercel](https://vercel.com/) Edge Network |

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/) (v18+)

### Local Development Setup
```bash
# Clone the repository
git clone https://github.com/nichroot/poyalo.git
cd dufaii

# Install dependencies
bun install

# Start development server
bun run dev
```

### Building for Production
```bash
# Type check and build Vite bundle
bun run build

# Preview production build locally
bun run preview
```

---

## 📱 Progressive Web App (PWA)

POYALO is configured as a full PWA:
- **Manifest:** Standalone display mode, high-res neo-brutalist travel icon, landscape/portrait support.
- **Offline Mode:** Core UI, cached itineraries, myth database, passport evaluation engine, and 3D WebGL engine operate 100% offline.
- **Install Prompt:** First-time onboarding banner guides users to install to their home screen.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE) — see the LICENSE file for details.
