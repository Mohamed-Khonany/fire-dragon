# Comprehensive Quality and Performance Audit Report

> **Project:** Fire Dragon Portfolio (`Mohamed-Khonany/fire-dragon`)  
> **Branch:** `fix/audit`  
> **Date:** October 2026  
> **Auditor:** Senior Engineering Quality & Performance Audit  
> **Baseline Status:**  
> - `npm run build`: **FAILED** (TypeScript compile error in `LightboxModal.tsx`)  
> - `npx tsc --noEmit`: **3 errors** (All in `LightboxModal.tsx`)  
> - `npm run lint`: **24 problems** (8 errors, 16 warnings across 10 files)  

---

## Executive Summary & Baseline Metrics

| Metric | Pre-Audit Baseline | Target Post-Audit |
| :--- | :--- | :--- |
| **Production Build (`npm run build`)** | **FAILED** (Exited with code 1) | **PASS** (Zero build errors) |
| **TypeScript Type Check (`tsc --noEmit`)** | **3 errors** | **0 errors** |
| **ESLint Audit (`npm run lint`)** | **8 errors, 16 warnings** | **0 errors, 0 warnings** |
| **Terminal 404 Re-renders** | ~60 re-renders/sec on hover (state-driven scanline) | 0 state re-renders (pure CSS animation) |
| **Window Scroll Listener (`Header`)** | Un-throttled scroll event handler | Passive, micro-optimized scroll handler |
| **React 19 Compatibility** | Mutating refs during render (`glowCursor.tsx`) | 100% compliant with React 19 render rules |

---

## Baseline Issues Log

### Summary Table

| Issue ID | Severity | Category | File Path & Line | Summary | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **AUD-01** | **Critical** | Bug / Build | `components/UI/LightboxModal/LightboxModal.tsx`: 8-21 | Invalid ref type and broken event handler signature causing build failure | Planned |
| **AUD-02** | **High** | Bug / React 19 | `components/UI/glowCursor/glowCursor.tsx`: 250 | Direct ref mutation (`cfgRef.current = ...`) during render pass | Planned |
| **AUD-03** | **High** | Performance / Bug | `components/UI/not-found/terminalBlock.tsx`: 87-102 | 60Hz React state update loop driving scanline animation | Planned |
| **AUD-04** | **High** | Bug / React 19 | `components/UI/not-found/terminalBlock.tsx`: 45 | Synchronous `setState` calls inside `useEffect` triggering cascading renders | Planned |
| **AUD-05** | **High** | Bug / React 19 | `components/UI/not-found/glitchDigits.tsx`: 12 | Synchronous `setState` calls inside `useEffect` | Planned |
| **AUD-06** | **High** | Bug / React 19 | `app/not-found.tsx`: 18 | Synchronous `setMounted(true)` inside `useEffect` | Planned |
| **AUD-07** | **Medium** | Bug / Lint | `components/Sections/about/aboutHero/aboutsection.tsx`: 27 | Explicit `any` type on component props | Planned |
| **AUD-08** | **Medium** | Glitch / Lint | `app/not-found.tsx`: 80 | Unescaped single quote entities in JSX (`you're`, `doesn't`) | Planned |
| **AUD-09** | **Medium** | Glitch / Lint | `components/Sections/about/technicalForege/skillBadge.tsx`: 101 | Conditional expression used as statement (`openRef.current ? open() : close()`) | Planned |
| **AUD-10** | **Medium** | Performance | `components/UI/layout/header/header.tsx`: 14-22 | Un-throttled scroll listener on `window` without passive flag | Planned |
| **AUD-11** | **Low** | Dead Code / Lint | `app/not-found.tsx`: 4-16 | Unused imports (`Link`, `Home`, `ArrowLeft`, `FireSpan`, `router`) | Planned |
| **AUD-12** | **Low** | Dead Code / Lint | `components/Sections/hero/banner.tsx`: 1-3 | Unused imports (`Link`, `FireSpan`, `FireDev`) | Planned |
| **AUD-13** | **Low** | Dead Code / Lint | `components/Sections/about/softSkills/softSkills.tsx`: 2 | Unused import (`FireSpan`) | Planned |
| **AUD-14** | **Low** | Dead Code / Lint | `components/Sections/projects/projects.tsx`: 3 | Unused import (`GradientText`) | Planned |
| **AUD-15** | **Low** | Dead Code / Lint | `components/Sections/about/technicalForege/categories.tsx`: 41 | Unused import (`VSCodeIcon`) | Planned |
| **AUD-16** | **Low** | Dead Code / Lint | `components/UI/layout/header/navlinks.tsx`: 2 | Unused import (`Line`) | Planned |
| **AUD-17** | **Low** | Dead Code / Lint | `components/UI/glowCursor/glowCursor.tsx`: 197 | Dead function (`alphaOf`) | Planned |
| **AUD-18** | **Low** | Dead Code / Lint | `components/UI/not-found/terminalBlock.tsx`: 105 | Unused variable (`lastLineDelay`) | Planned |
| **AUD-19** | **Low** | Glitch / Hygiene | `data/hero-data.ts`: 5 | Invalid relative filesystem path for public asset logo | Planned |
| **AUD-20** | **Low** | Glitch / Lint | `components/UI/LightboxModal/LightboxModal.tsx`: 29 | Raw `<img>` tag without Next.js Image optimization | Planned |

---

## Detailed Issue Breakdown & Planned Fixes

### AUD-01 [Critical] TypeScript Compile & Runtime Crash in `LightboxModal.tsx`
- **Location:** `components/UI/LightboxModal/LightboxModal.tsx` (Lines 4, 8–12, 15, 19)
- **Problem:**
  1. `const modalRef = useRef(null);` initializes `modalRef` without a generic type. TypeScript infers `RefObject<never>`. Line 9 `modalRef.current.contains(...)` errors with `TS2339: Property 'contains' does not exist on type 'never'`.
  2. Line 8 declares `const handleClickOutside = ({event}:{ event: MouseEvent }) => { ... }`. When passed to `document.addEventListener("mousedown", handleClickOutside)`, the DOM passes `MouseEvent` directly. In TypeScript this triggers `TS2769: No overload matches this call`. At runtime, if invoked, destructuring `{ event }` from `MouseEvent` yields `undefined`, crashing immediately with `Cannot read properties of undefined (reading 'target')`.
  3. This completely prevents `npm run build` from succeeding.
- **Planned Fix:**
  - Type `modalRef` as `useRef<HTMLDivElement>(null)`.
  - Fix the listener signature to `(event: MouseEvent) => { if (modalRef.current && !modalRef.current.contains(event.target as Node)) { onClose(); } }`.

---

### AUD-02 [High] React 19 Ref Mutation During Render in `glowCursor.tsx`
- **Location:** `components/UI/glowCursor/glowCursor.tsx` (Line 250)
- **Problem:**
  `cfgRef.current = { ... }` is executed unconditionally in the body of the `GlowCursor` component function during render. React 19 and modern ESLint flag this via rule `react-hooks/refs`. Mutating ref objects during render violates pure component execution and can result in stale or inconsistent behavior during concurrent render passes.
- **Planned Fix:**
  Update `cfgRef.current` safely inside a `useLayoutEffect` or synchronize configuration without mutating refs during render.

---

### AUD-03 [High] 60Hz React State Re-render Loop Driving Scanline in `terminalBlock.tsx`
- **Location:** `components/UI/not-found/terminalBlock.tsx` (Lines 87–102)
- **Problem:**
  ```tsx
  const iv = setInterval(() => {
    pos += 3;
    setScanPos(pos);
    if (pos > 200) pos = -100;
  }, 16);
  ```
  While the terminal is hovered, `setInterval` triggers a React state update (`setScanPos`) every 16 milliseconds (~60 times per second), forcing `TerminalBlock` and all of its typewriter child lines to re-render 60 times a second on the JavaScript main thread.
- **Planned Fix:**
  Replace the JavaScript timer and state-driven `top: ${scanPos}%` style with a dedicated hardware-accelerated CSS keyframe animation (`transform: translateY(...)`), reducing React re-renders from 60/sec to 0/sec during hover.

---

### AUD-04, AUD-05, AUD-06 [High] Synchronous `setState` Inside `useEffect`
- **Locations:**
  - `app/not-found.tsx`: Line 18 (`setMounted(true)`)
  - `components/UI/not-found/glitchDigits.tsx`: Line 12 (`setDisplay(text)`)
  - `components/UI/not-found/terminalBlock.tsx`: Line 45 (`setDisplayed("")`, `setDone(false)`)
- **Problem:**
  Calling `setState` synchronously at the start of a `useEffect` execution triggers immediate cascading re-renders, causing layout thrashing and violating React 19 best practices (`react-hooks/set-state-in-effect`).
- **Planned Fix:**
  - For `app/not-found.tsx`: Refactor entrance animation or schedule mounted state appropriately.
  - For `glitchDigits.tsx`: Reset display when text changes or on active transition without synchronous setter calls in effect body.
  - For `terminalBlock.tsx`: Initialize displayed text cleanly when reset triggers.

---

### AUD-07 [Medium] Explicit `any` Type on Component Props in `aboutsection.tsx`
- **Location:** `components/Sections/about/aboutHero/aboutsection.tsx` (Line 27)
- **Problem:**
  `export default function AboutSection({ data }: { data: any })` circumvents TypeScript type safety and triggers ESLint `@typescript-eslint/no-explicit-any`.
- **Planned Fix:**
  Define a strongly-typed `AboutSectionData` interface that models `aboutData` (name, title, description, socials, profilePhoto, yearsOfExperience, cv).

---

### AUD-08 [Medium] Unescaped Entities in JSX in `app/not-found.tsx`
- **Location:** `app/not-found.tsx` (Line 80)
- **Problem:**
  Unescaped `'` in `The Page you're looking for doesn't exist` causes ESLint `react/no-unescaped-entities` errors.
- **Planned Fix:**
  Replace with `The Page you&apos;re looking for doesn&apos;t exist`.

---

### AUD-09 [Medium] Conditional Expression Used as Statement in `skillBadge.tsx`
- **Location:** `components/Sections/about/technicalForege/skillBadge.tsx` (Line 101)
- **Problem:**
  `openRef.current ? open() : close();` causes `@typescript-eslint/no-unused-expressions`.
- **Planned Fix:**
  Convert to standard `if (openRef.current) { open(); } else { close(); }`.

---

### AUD-10 [Medium] Un-throttled Scroll Event Listener in `header.tsx`
- **Location:** `components/UI/layout/header/header.tsx` (Lines 14–22)
- **Problem:**
  `window.addEventListener("scroll", handleScroll)` runs on every scroll frame without `{ passive: true }`. On high-refresh displays (120Hz/144Hz), firing scroll handlers synchronously can cause frame drops.
- **Planned Fix:**
  Add `{ passive: true }` to the scroll event listener and optimize state toggle to only dispatch when the threshold boolean actually changes.

---

### AUD-11 to AUD-18 [Low] Dead Code and Unused Imports
- **Locations:** Multiple files (`app/not-found.tsx`, `banner.tsx`, `softSkills.tsx`, `projects.tsx`, `categories.tsx`, `navlinks.tsx`, `glowCursor.tsx`, `terminalBlock.tsx`)
- **Problem:**
  Unused imported modules, variables, and functions increase bundle overhead, clutter scope, and trigger 16 ESLint warnings.
- **Planned Fix:**
  Remove unused imports and unused variables cleanly.

---

### AUD-19 [Low] Invalid Asset Path in `hero-data.ts`
- **Location:** `data/hero-data.ts` (Line 5)
- **Problem:**
  `logo: "../public/assets/images/logo/logo-banner.png"` is a relative filesystem path rather than a valid public URL (`/assets/images/logo/logo-banner.png`).
- **Planned Fix:**
  Update to `/assets/images/logo/logo-banner.png`.

---

### AUD-20 [Low] Raw `<img>` in `LightboxModal.tsx`
- **Location:** `components/UI/LightboxModal/LightboxModal.tsx` (Line 29)
- **Problem:**
  Using `<img>` triggers Next.js warning `@next/next/no-img-element`.
- **Planned Fix:**
  Replace with Next.js `<Image />` or add appropriate styling and sizing props.
