# IMPLEMENTATION_PLAN.md — POYALO Phased Engineering Roadmap

> **Target Timeline:** Hackathon Sprint (24-Hour to 48-Hour Execution Model)  
> **Core Principle:** Tier 0 MUST work end-to-end before Tier 1 or Tier 2 are started. Feature freeze at 75% elapsed time.  

---

## 1. Phased Architecture & Tier Breakdown

```
+--------------------------------------------------------------------------+
| TIER 0: DEMO CORE (HOURS 0 - 12)                                         |
| 1. Neo-brutalist PWA Shell & Mobile Bottom Dock (Vite + Tailwind)        |
| 2. Local City Dataset (40 POIs + 6 Hero Places in IndexedDB)             |
| 3. Reality Check Validation Engine (Hours, Days, Transit, Daylight)      |
| 4. Comic-Book Story Box with 4 Tones (incl. Roast) & Speech Bubbles      |
| 5. Murphy Mode Chaos Replan Button                                       |
| 6. Entry Check (Passport Matrix & 6-Month Expiry Rule)                   |
| 7. "Little UAE" 3D Browser World (Three.js Al Fahidi Creek district)     |
| 8. Mobile Virtual Joystick + Collectible Pearls & Dallahs with Score     |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
| TIER 1: MULTIPLAYER & SERVICES (HOURS 12 - 18)                           |
| 9. Real-Time Player Avatars & Proximity Emotes via Supabase Realtime     |
| 10. Cultural Collection Album (Unlocked UAE heritage facts)             |
| 11. Local Services Directory (Guides & Photographers)                   |
| 12. Golden-Hour SunCalc Integration                                      |
| 13. Social Boarding Pass Generator (Vertical Mobile Ticket)             |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
| TIER 2: DELIGHT & WOW (HOURS 18 - 20)                                    |
| 14. District 2: Golden Dunes Desert Oasis 3D scene                       |
| 15. "Guilt Trip" Carbon Roast with Absurd Local Units                    |
| 16. Real-time Compass Arrow to Nearest Story Box                         |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
| PHASE 4: STABILIZATION, AUDIT & DEMO REHEARSAL (HOURS 20 - 24)           |
| * Lighthouse PWA 100 Audit & Offline Airplane-Mode Verification          |
| * 3D WebGL 60 FPS Mobile Performance Tuning                              |
| * 3-Minute Demo Pitch Rehearsal (5 dry runs on physical phones)          |
+--------------------------------------------------------------------------+
```

---

## 2. Detailed Task Breakdown by Phase

### Phase 1: Foundation & Design Shell (Hours 0 – 3)
- [ ] Initialize React + TypeScript + Vite project with `vite-plugin-pwa` and Three.js.
- [ ] Configure Tailwind theme tokens: Layover Blue, Jet Orange, Comic Gold, Deep Black, Canvas Cream.
- [ ] Build reusable Neo-Brutalist components: `PoyaloPill`, `BoardingPassTicket`, `SpeechBubble`, `ComicPanel`.
- [ ] Implement persistent 5-tab mobile bottom dock (`Explore`, `Audit`, `Comic`, `3D UAE`, `Services`).

### Phase 2: Local Datasets & Offline Storage Engine (Hours 3 – 5)
- [ ] Configure Dexie.js database (`PoyaloOfflineDB`) with tables for places, comic stories, stamps, and game scores.
- [ ] Bundle 40 Fort Kochi / Calicut POIs into `places.json` and 6 Hero Comic Lore packs into `comicStories.json`.
- [ ] Bundle minified Passport Index matrix into `passportRules.json`.
- [ ] Setup Three.js asset pipeline with low-poly glTF models of Al Fahidi Creek and collectibles.

### Phase 3: Reality Check & Murphy Mode Engine (Hours 5 – 8)
- [ ] Build deterministic validation rules in `realityCheckEngine.ts` (Hours, Days, Transit, SunCalc, Rain).
- [ ] Implement 1-Tap Auto-Repair algorithm (reorders stops and replaces closed venues).
- [ ] Implement Murphy Mode red chaos button with instant live replanning.
- [ ] Implement Entry Check passport expiry and destination entry classification.

### Phase 4: Comic-Book Story Box Engine (Hours 8 – 10)
- [ ] Build responsive multi-panel comic reader component with speech bubbles and narrative caption boxes.
- [ ] Implement 4-way Tone Dial toggle (`Professor`, `Storyteller`, `Roast`, `Kid`) with instantaneous text updates.
- [ ] Add Era Layer slider (Ancient, Colonial, Modern).
- [ ] Integrate synchronized audio playback with highlighted panels.

### Phase 5: "Little UAE" 3D Web Exploration & Collectibles (Hours 10 – 13)
- [ ] Build Three.js canvas container with orbit camera and golden-hour lighting.
- [ ] Implement mobile on-screen virtual joystick and touch drag-to-look camera controls.
- [ ] Scatter 15–20 low-poly collectibles (pearls, dallahs, dates) with spherical collision detection.
- [ ] Implement celebratory sound chimes and Cultural Collection Album fact unlocks.

### Phase 6: Real-Time Human Multiplayer & Social Greetings (Hours 13 – 16)
- [ ] Connect Supabase Realtime channel `game:district-dubai` for presence tracking.
- [ ] Render live remote player avatars with smooth linear position interpolation (lerp at 60 FPS).
- [ ] Implement proximity greeting pill (`[ 👋 SAY MARHABA ]`) emitting animated speech bubbles above avatars.
- [ ] Connect live district score aggregator and leaderboard.

### Phase 7: Local Services Marketplace & Social Share Pass (Hours 16 – 19)
- [ ] Build filterable Guide and Photographer directory with 6-character booking codes (`POY-842`).
- [ ] Build vertical mobile boarding pass generator combining trip score, 3D game collectibles, and QR code.

### Phase 8: Hardening, Rehearsal & Feature Freeze (Hours 19 – 24)
- [ ] **FEATURE FREEZE:** Zero new features.
- [ ] Verify 60 FPS WebGL performance on physical smartphones.
- [ ] Verify 100% offline functionality in physical Airplane Mode.
- [ ] Rehearse 3-minute pitch runbook 5 times with stopwatches.
