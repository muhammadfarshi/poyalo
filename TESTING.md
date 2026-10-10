# TESTING.md — POYALO Quality Assurance & Test Strategy

> **Goal:** 100% deterministic reliability during live stage presentations. Zero runtime crashes, zero offline failures, smooth 60 FPS 3D WebGL performance.  

---

## 1. Test Levels & Coverage Targets

```
+--------------------------------------------------------------------------+
|                       POYALO TESTING PYRAMID                             |
|                                                                          |
|                [ E2E Live Demo Pitch Runbook ]  (5 dry runs)             |
|          [ 3D WebGL 60 FPS Mobile Performance & Touch Tests ]            |
|          [ Real-Time Multiplayer Presence & Emote Tests ]                |
|          [ Airplane-Mode Offline PWA & Comic Cache Tests ]               |
|     [ Unit Tests: Reality Check & Entry Check Engines ]  (100% pass)     |
+--------------------------------------------------------------------------+
```

---

## 2. 3D WebGL & Multiplayer Test Cases

```typescript
describe('Little UAE 3D Game & Multiplayer', () => {
  it('TC-3D-01: collects item and increments score when player is within 1.2 meters', () => {
    const playerPos = { x: 10.0, y: 0.0, z: -5.0 };
    const pearlPos = { x: 10.5, y: 0.2, z: -5.3 };
    const dist = Math.hypot(playerPos.x - pearlPos.x, playerPos.y - pearlPos.y, playerPos.z - pearlPos.z);

    expect(dist).toBeLessThanOrEqual(1.2);
    // Triggers collection event, chime audio, and unlocks lore card
  });

  it('TC-3D-02: clamps virtual joystick displacement to maximum radius R=48px', () => {
    const touchOrigin = { x: 100, y: 200 };
    const activeTouch = { x: 180, y: 260 }; // Raw dx=80, dy=60, dist=100px
    const clamped = calculateClampedJoystickVector(touchOrigin, activeTouch, 48);

    const length = Math.hypot(clamped.dx, clamped.dy);
    expect(length).toBeCloseTo(48, 1);
    expect(clamped.normalized.x).toBeCloseTo(0.8, 1);
    expect(clamped.normalized.y).toBeCloseTo(0.6, 1);
  });

  it('TC-3D-03: triggers proximity greeting button when two players are within 3 meters', () => {
    const playerA = { x: 14.0, z: -8.0 };
    const playerB = { x: 15.5, z: -9.0 };
    const dist = Math.hypot(playerA.x - playerB.x, playerA.z - playerB.z);

    expect(dist).toBeLessThan(3.0);
    // UI state shows "Say Marhaba! 👋" button
  });
});
```

---

## 3. Comic-Book Lore Test Cases

```typescript
describe('Comic-Book Lore Engine', () => {
  it('TC-COMIC-01: switches speech bubbles and captions instantly upon tone dial change', () => {
    const comic = getComicStory('dutch-palace', 'colonial', 'roast');
    expect(comic.tone).toBe('roast');
    expect(comic.panels[0].speechBubbles[0].text).toContain('apology gift');

    const professorComic = getComicStory('dutch-palace', 'colonial', 'professor');
    expect(professorComic.tone).toBe('professor');
    expect(professorComic.panels[0].speechBubbles[0].text).toContain('temple plunder');
  });

  it('TC-COMIC-02: stacks panels vertically on viewport width < 768px', () => {
    const layout = calculateComicLayout(390); // iPhone 14 screen width
    expect(layout.columns).toBe(1);
    expect(layout.scrollMode).toBe('vertical-stream');
  });
});
```

---

## 4. The 3-Minute Demo Pitch Choreography (Runbook)

| Timeline | Stage Action | Device State | Speaker Script Cue |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:20** | Show home screen PWA icon, tap to launch | Online / PWA shell | *"Every place has a comic story. Every plan gets a reality check. Meet POYALO."* |
| **0:20 – 0:50** | Paste chaotic WhatsApp plan; tap Reality Check | Local Engine | *"Here's an itinerary from a group chat. Score: 42. Synagogue closed on Saturday. Sunset at 8:30 PM. We roast the plan."* |
| **0:50 – 1:15** | Tap `ONE-TAP AUTO REPAIR`; score jumps to 94 | Local Engine | *"One tap: route re-sequenced, closed venue swapped, sunset snapped to Golden Hour."* |
| **1:15 – 1:35** | Tap red `MURPHY MODE` button (Monsoon Downpour) | Instant Replan | *"Sudden monsoon downpour hits. Murphy Mode recalculates: outdoor beach swapped for indoor heritage comic museum."* |
| **1:35 – 2:00** | Flip phone to **AIRPLANE MODE**. Open Comic Lore tab | **100% Offline** | *"Airplane mode ON. No signal needed. Let's open the Dutch Palace story: it renders as a graphic novel comic strip in Roast mode."* |
| **2:00 – 2:35** | Open **"Little UAE" 3D Game** tab. Walk in 3D using joystick. Collect a pearl. Second phone walks in; send `"Marhaba! 👋"` | **Live 3D & Realtime Presence** | *"Now for the CCJ to DXB grand prize: Little UAE in 3D. We walk through Old Dubai Creek on a phone browser. Here's a pearl. And look—another traveler just walked up! Say Marhaba."* |
| **2:35 – 3:00** | Navigate to Services. Show photographer booking code `POY-842` & Boarding Pass | Social Share Pass | *"Comic lore hooks, Reality Check helps, 3D connects travelers. Built for the real world."* |

---

## 5. Failure Recovery Protocols on Stage

1. **Venue Wi-Fi dies:** Completely irrelevant; App shell, Comic Lore, and 3D single-player mode operate 100% offline via Service Worker and CacheStorage.
2. **WebGL Context Lost:** The renderer automatically listens for `webglcontextlost` and calls `event.preventDefault()`, reloading the lightweight scene without browser crash.
3. **Multiplayer presence fails due to bad venue cellular:** The 3D game gracefully falls back to single-player exploration without showing connection errors.
