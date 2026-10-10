# AGENTS.md — Instructions for AI Coding Agents

> **Audience:** Autonomous AI Coding Assistants, Pair Programmers & LLM Agents  
> **App Name:** POYALO  
> **Mission:** Build and maintain an offline-first travel PWA pairing comic-book lore, deterministic itinerary validation, and "Little UAE" 3D WebGL exploration.  

---

## 1. Golden Rules & Architectural Invariants

Whenever generating or refactoring code for POYALO, you **MUST** strictly adhere to these invariant rules:

1. **NO IMPLEMENTATION WITHOUT EXPLICIT USER COMMAND:**
   - The user instructed: `[DONT START TO MAKE IT]`. Do not write app code, launch `vite`, or generate `src/App.tsx` unless the user explicitly commands: *"build"*, *"start the build"*, or gives permission to proceed with code implementation.
2. **DETERMINISTIC CLIENT VALIDATION:**
   - The Reality Check engine and Entry Check rules **MUST** execute locally in client-side TypeScript. Never replace client rule evaluation with an asynchronous LLM API call.
3. **NEO-BRUTALIST & COMIC-BOOK VISUAL INTEGRITY:**
   - Never use soft blurry shadows (`box-shadow: 0 4px 6px rgba(...)`).
   - Elevation is **always** hard and flat: `box-shadow: 4px 4px 0px #111827`.
   - Comic strips must feature speech bubbles, narrative caption boxes, action sound decals, and heavy black borders (`2.5px solid #111827`).
4. **SMARTPHONE-FIRST ERGONOMICS:**
   - Every layout must be fully functional on a **375px wide mobile screen**.
   - Boarding passes must stack vertically on mobile with horizontal perforated tear-lines and side circular notches.
   - 3D Game controls must feature an on-screen floating virtual joystick and touch-look drag area with minimum 48px touch targets.
5. **THREE.JS / WEBGL MEMORY INTEGRITY:**
   - Always invoke `.dispose()` on all geometries, materials, and textures in component unmount cleanups to prevent mobile browser VRAM leaks.
6. **ZERO SENSITIVE PASSPORT STORAGE:**
   - Never generate code that prompts for passport numbers, Aadhaar numbers, or passport photo/PDF uploads. Only prompt for nationality and passport expiry date.
7. **API KEY ISOLATION:**
   - The `GEMINI_API_KEY` must never be referenced in client code.

---

## 2. Common Agent Pitfalls to Avoid

| Pitfall | Agent Mistake | Correct POYALO Practice |
| :--- | :--- | :--- |
| **Shadows** | Using Tailwind `shadow-lg` or `shadow-md` | Use `shadow-brutal` (`4px 4px 0px #111827`) |
| **Borders** | Using `border` (1px) | Use `border-2` or `border-2.5` |
| **History View** | Rendering plain markdown text walls | Render multi-panel comic strips with speech bubbles |
| **3D Memory** | Creating Three.js meshes without unmount disposal | Traverse scene and invoke `.dispose()` on cleanup |
| **Mobile Layouts**| Hardcoding desktop horizontal tickets on mobile | Provide mobile vertical stacking with horizontal perforation line |
| **Touch Controls**| Relying solely on keyboard WASD | Provide virtual touch joystick for mobile smartphones |
