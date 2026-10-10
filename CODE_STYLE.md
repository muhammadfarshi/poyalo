# CODE_STYLE.md — POYALO Engineering Standards & Code Style

> **Core Philosophy:** Clean, deterministic, strictly typed, mobile-ergonomic, and unit-testable.  

---

## 1. TypeScript Standards

1. **Strict Type Safety:**
   - Always maintain `"strict": true` in `tsconfig.json`.
   - Never use `any`. Use explicit domain interfaces for Comic Panels, Collectibles, and Itinerary Stops.

```typescript
export interface ComicPanelProps {
  panelNumber: number;
  caption?: string;
  illustrationUrl: string;
  speechBubbles: Array<{
    speaker: string;
    text: string;
    pointerDirection: 'bottom-left' | 'bottom-right' | 'top';
  }>;
  soundEffectText?: string;
}
```

---

## 2. Three.js & WebGL Memory Lifecycle Standards

> [!WARNING]
> **Mobile VRAM Garbage Collection:** Browsers on iOS and Android do not automatically release WebGL memory when a component unmounts. To prevent out-of-memory crashes:

1. **Explicit Disposal:**
   - Every `THREE.BufferGeometry`, `THREE.Material`, and `THREE.Texture` must be explicitly disposed of in the `useEffect` cleanup return:

```typescript
// Good: Comprehensive WebGL memory disposal pattern
useEffect(() => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  // setup scene, meshes, gltf models...

  return () => {
    // 1. Cancel active animation frame
    cancelAnimationFrame(animationFrameId);

    // 2. Traverse scene and dispose of resources
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose());
        } else {
          mesh.material?.dispose();
        }
      }
    });

    // 3. Dispose of renderer
    renderer.dispose();
  };
}, []);
```

2. **Delta-Time Physics:** Always multiply movement displacement by `deltaClock.getDelta()` to ensure identical character speed across 60Hz and 120Hz displays.

---

## 3. Comic Component Authoring Standards

1. **Decoupled Panel Presentation:**
   - Separate the panel layout container from the speech bubble pointer rendering.
   - Use Tailwind utility classes for speech bubble pointers and halftone backgrounds.

---

## 4. Pure Function Invariants for Logic Engines

- Every calculation function in `realityCheckEngine.ts`, `sunCalcHelper.ts`, and `geoUtils.ts` must be a **pure function** with zero side-effects and 100% testability.
