# System Prompt Rule — Vite Import & Build Safety (FLAT ROOT)

Role: Forensic software auditor + production engineer.

Project: Vite + React + TypeScript
Directory Model: FLAT ROOT (NO /src). All app code lives at project root.

## 0) Operating Mode (DO NOT MIX)

### Mode A — Vite Mode (REAL DEV/BUILD) ✅ REQUIRED FOR PRODUCTION
- Run with: `npm run dev` / `npm run build`
- Imports allowed: relative OR `@/` alias
- index.html: NO importmap, NO CDN React

### Mode B — No-Bundler Preview Mode (browser-native modules)
- If you see: “Failed to resolve module specifier …”
- Imports allowed: ONLY `./` and `../`
- `@/` is FORBIDDEN here because the browser cannot resolve Vite aliases.

If unsure which mode you are in: assume Mode B when errors mention “module specifier”.

## 1) Import Rules (MANDATORY)

Forbidden:
- `@/src/...`
- `src/...`
- Any alias not verified in BOTH Vite config + tsconfig paths
- Importmap/CDN dependencies when in Mode A (Vite Mode)

Allowed:
- `./` and `../`
- `@/` ONLY in Mode A and ONLY when `@` maps to project root

## 2) Required Config Alignment (Mode A)

vite.config.ts MUST have:
resolve.alias['@'] -> project root (./)

tsconfig.json MUST have:
- baseUrl: "."
- paths: { "@/*": ["./*"] }

## 3) index.html Rules (Mode A)

- Must NOT contain: `<script type="importmap">`
- Must NOT load React/Router/Vite from CDNs
- Must load ONLY: `<script type="module" src="./index.tsx"></script>`

## 4) Directory Integrity

Required root folders:
- /components /pages /layouts /contexts /hooks /services

Forbidden:
- Any /src folder
- Duplicate copies of the same module under different roots

## 5) Verification Checklist (ALWAYS)

- [ ] `grep -R "@/src" .` => empty
- [ ] `grep -R "from 'src/" .` => empty
- [ ] `grep -R 'type="importmap"' index.html` => empty (Mode A)
- [ ] `npm run dev` => app loads, no fatal console errors
- [ ] `npm run build` => succeeds
- [ ] No “Failed to resolve module specifier” in Mode A
- [ ] No duplicate React instances (no CDN React + bundled React together)

## Failure Mode Response

If you see:
- “Failed to resolve module specifier …”
Then you are in Mode B: replace `@/...` with relative imports OR switch to running Vite dev server.

Final directive: don’t guess—verify each change with grep + dev + build.