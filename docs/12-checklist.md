# 🕵️ Forensic System Verification Checklist

**Objective:** Verify removal of "Hybrid State" and ensure Production Readiness.

## 1. Core Architecture (Critical)
- [ ] **Import Map Removed:** Verify `index.html` does NOT contain `<script type="importmap">`.
- [ ] **Entry Point:** Verify `index.html` points to `<script type="module" src="/index.tsx"></script>`.
- [ ] **Type Definitions:** Verify `src/vite-env.d.ts` includes `/// <reference types="vite/client" />`.
- [ ] **Vite Config:** Verify `vite.config.ts` includes `historyApiFallback: true` (or handled via plugin) to support SPA routing on refresh.

## 2. Dependency Resolution
- [ ] **React Conflict:** Ensure `react` and `react-dom` are loaded via `node_modules` (Vite) and not CDN.
- [ ] **Path Aliases:** Verify imports using `@/` resolve correctly in `vite.config.ts` (mapped to `./` for Flat Root).
- [ ] **Mermaid Diagrams:** If using Mermaid:
    - Ensure `mermaid.initialize()` is called once in `useEffect`.
    - Ensure the container `div` has a unique ID.
    - **Fix:** If blank, try delaying render by 100ms to allow DOM paint.

## 3. Runtime Environment
- [ ] **Env Variables:** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must be present.
- [ ] **Fallback Mode:** If keys are missing, ensure `src/lib/supabase.ts` does not crash the app but logs a warning.

## 4. Visual Regression
- [ ] **White Screen:** If screen is white, check Console for `Uncaught SyntaxError` or `Module not found`.
- [ ] **Tailwind:** Verify styles load (using CDN script in `index.html` for now).

## 5. Next Steps (Refactoring)
- **Phase 1:** Move Tailwind from CDN to PostCSS build step for better performance.
- **Phase 2:** Replace `any` types in `src/vite-env.d.ts` with specific library types if available.