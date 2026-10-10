# TRD.md — POYALO Technical Requirements Document

> **Document Version:** 2.0.0 (Comic Engine & 3D WebGL Multiplayer Specs)  
> **Target Engineering Stack:** TypeScript (Strict), React 18/19, Three.js, Vite, Tailwind CSS, Dexie.js (IndexedDB), Workbox PWA, Supabase Realtime  
> **Status:** APPROVED ENGINEERING SPECIFICATION  

---

## 1. Reality Check Verification Algorithms

*(The deterministic mathematical rules for operating hours, transit speeds, SunCalc golden-hour alignment, and Entry Check remain identical to Version 1.0.0, running 100% in client TypeScript)*.

---

## 2. Comic-Book Lore Engine Specifications

### 2.1 Comic Panel Data Schema
```typescript
export interface ComicSpeechBubble {
  speaker: string;
  avatarUrl?: string;
  text: string;
  type: 'speech' | 'thought' | 'shout';
  pointerDirection: 'bottom-left' | 'bottom-right' | 'top';
}

export interface ComicPanel {
  panelNumber: number;
  narrativeCaption?: string; // e.g. "MEANWHILE, AT THE OLD FORT..."
  illustrationUrl: string;
  speechBubbles: ComicSpeechBubble[];
  soundEffect?: {
    text: string; // e.g. "SWOOSH!", "YALLA!"
    color: string;
    rotationDeg: number;
  };
}

export interface ComicStory {
  placeId: string;
  eraLayer: 'ancient' | 'colonial' | 'modern';
  tone: 'professor' | 'storyteller' | 'roast' | 'kid';
  title: string;
  panels: ComicPanel[];
  sources: string[];
}
```

### 2.2 Responsive Layout Invariant
- On screens $\ge 768\text{px}$: Render as a 3-column horizontal comic book page.
- On screens $< 768\text{px}$: Render as a vertical continuous comic strip or a touch-friendly horizontal swipe carousel with CSS scroll-snap (`snap-x snap-mandatory`).

---

## 3. "Little UAE" 3D WebGL Game Technical Specifications

### 3.1 Three.js Coordinate Space & Camera Rig
- **Coordinate System:** Right-handed Cartesian coordinates ($Y$ is up, $X$ is right, $Z$ is forward).
- **Third-Person Orbit Camera:** Follows player position $\vec{P} = (x_p, y_p, z_p)$ at distance $r = 6.0\text{m}$.
- **Spherical Conversion:**
  $$x_c = x_p + r \cdot \sin(\phi) \cdot \sin(\theta)$$
  $$y_c = y_p + r \cdot \cos(\phi) + 1.8$$
  $$z_c = z_p + r \cdot \sin(\phi) \cdot \cos(\theta)$$
  where $\theta$ is azimuthal angle controlled by horizontal swipe, and $\phi$ is polar angle clamped to $[15^\circ, 75^\circ]$.

### 3.2 Mobile Virtual Joystick Vector Math
Given touch origin $O = (x_0, y_0)$ and active touch point $T = (x_t, y_t)$ with maximum radius $R = 48\text{px}$:
$$\Delta x = x_t - x_0, \quad \Delta y = y_t - y_0$$
$$d = \sqrt{\Delta x^2 + \Delta y^2}$$
$$\text{If } d > R: \quad \Delta x \gets \Delta x \cdot \frac{R}{d}, \quad \Delta y \gets \Delta y \cdot \frac{R}{d}$$
$$\vec{v}_{input} = \left(\frac{\Delta x}{R}, -\frac{\Delta y}{R}\right)$$
- Forward and lateral velocity vectors are applied relative to camera azimuth $\theta$:
  $$\vec{v}_{world} = \mathbf{R}_y(\theta) \cdot \begin{pmatrix} v_x \\ 0 \\ v_y \end{pmatrix} \cdot \text{Speed}$$

### 3.3 Collectible Proximity Detection
Every frame in the game loop ($60\text{ FPS}$), the distance to all active collectible bounding spheres is evaluated:
$$d_i = \|\vec{P}_{player} - \vec{P}_{item, i}\|$$
- If $d_i \le 1.2\text{m}$: Trigger collection event, play Web Audio chime, award points, and add cultural fact to traveler's digital Passport.

### 3.4 Multiplayer Remote Player Interpolation (Lerp)
Remote player updates arrive via Supabase Realtime at frequency $f = 10\text{ Hz}$ ($\Delta t = 100\text{ms}$).
- At each render frame, the remote avatar position is updated via linear interpolation:
  $$\vec{P}_{render}(t) = \vec{P}_{current} + (\vec{P}_{target} - \vec{P}_{current}) \cdot \min(1.0, \alpha \cdot \Delta t_{frame})$$
  with smoothing coefficient $\alpha \approx 12.0$.
- Avatar rotation is updated using quaternion spherical linear interpolation (`slerp`).

---

## 4. WebGL Performance Budgets for Mobile PWA

| Parameter | Constraint | Enforcement Mechanism |
| :--- | :--- | :--- |
| **Draw Calls** | $\le 35$ per frame | Texture atlasing, instanced meshes for scenery |
| **Triangle Count** | $\le 25,000$ | Strict low-poly modeling; Blender decimate modifier |
| **Texture Memory** | $\le 16\text{ MB}$ | Single $512 \times 512$ compressed WebP texture atlas |
| **Frame Time** | $\le 16.6\text{ms}$ ($60\text{ FPS}$) | Dynamic resolution scaling if frame drops below 45 FPS |
| **Context Loss Handling** | Seamless restore | Listen to `webglcontextlost` and re-instantiate renderer |
