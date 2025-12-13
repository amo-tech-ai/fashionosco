
# FashionOS System Integration Plan & Architecture (v1.0)

**Role:** Senior Systems Architect
**Date:** May 2025
**Status:** **LIVE / PRODUCTION READY**

---

## 📊 Comprehensive Progress Tracker

### Phase 1: Foundation & Audit (✅ Completed)
- [x] **Repo Structure Audit**: Verified Vite/React frontend and Supabase Functions backend structure.
- [x] **Schema Validation**: Reviewed 50-table Supabase schema (`docs/supabase-schema.md`).
- [x] **Edge Function Review**: Validated `generate-shot-list`, `analyze-mood-board`, `generate-captions`.
- [x] **Env Variable Audit**: Identified required keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- [x] **AI Service Layer**: Verified frontend fallback logic (Demo Mode vs Live Mode).

### Phase 2: Wiring Strategy (✅ Completed)
- [x] **Architecture Selection**: Selected **Supabase-Centric** (BaaS) architecture for unified Auth/DB/Edge.
- [x] **Security Rules Defined**: Enforced server-side API keys and RLS policies.
- [x] **Client Strategy**: Defined `supabase-js` singleton pattern for React.
- [x] **Data Migration Plan**: Mapped `localStorage` entities to Postgres tables.

### Phase 3: Implementation (✅ Completed)
- [x] **Auth Integration**: Replaced mock login with Supabase Auth (Email/Google).
- [x] **DB Wiring**: Connected `CampaignService` to `shoots` and `events` tables via `ActiveCampaignContext`.
- [x] **Realtime Updates**: Enabled subscriptions for Dashboard activity feed.
- [x] **Storage**: Wired `moodBoardImages` and `gallery` to Supabase Storage.
- [x] **Directory**: Connected `StakeholderService` to `stakeholders` table.

---

## PART 1 — Setup Audit (Current State)

### A) Frontend (React/Vite)
*   **Framework:** React 19 + Vite. Solid, modern foundation.
*   **State:** Hybrid approach. `ActiveCampaignContext` manages the session, backed by Supabase for persistence and `localStorage` for optimistic UI updates in wizards.
*   **API Layer:** Consolidated services in `src/services/data/*`.
*   **Auth:** `AuthProvider` wraps the app, handling session hydration and protection.

### B) Backend (Supabase Edge Functions)
*   **Technology:** Deno-based Edge Functions.
*   **Deployed Functions:**
    *   `generate-shot-list` (Gemini 3 Pro)
    *   `analyze-mood-board` (Gemini 3 Pro Vision)
    *   `generate-captions` (Gemini 3 Pro)
    *   `audit-profile` (Gemini 3 Pro)
    *   `predict-engagement` (Gemini 3 Pro)
    *   `generate-video` (Veo / Gemini Video)

### C) Database (Supabase PostgreSQL)
*   **Schema:** 50 tables defined. 
*   **Active Tables:** `shoots`, `events`, `profiles`, `stakeholders`.

---

## PART 2 — Target Architecture

**Supabase-Centric Architecture (Implemented)**

1.  **Frontend (React):**
    *   Initializes `createClient(SUPABASE_URL, SUPABASE_ANON_KEY)`.
    *   Manages Auth Session.
    *   Calls Database directly for CRUD (protected by RLS).
    *   Calls Edge Functions for AI/Complex Logic (passing Auth Token).

2.  **Backend (Edge Functions):**
    *   Receives Request + User JWT.
    *   Validates User via `supabase.auth.getUser()`.
    *   Calls **Gemini API** (Server-side API Key).
    *   Returns JSON to Frontend.

---

## PART 3 — Verification

**1. Auth Sanity Test:**
*   `ProtectedRoute` actively guards `/dashboard` routes.
*   Redirects to `/login` if session is null.

**2. AI Resilience:**
*   All AI services (`shotList`, `moodBoard`, etc.) have `try/catch` blocks.
*   If `VITE_SUPABASE_ANON_KEY` is missing, services gracefully degrade to **Demo Mode** (Mock Data), ensuring the UI never breaks for unconfigured environments.

**3. Data Persistence:**
*   `CampaignService.save()` writes to the DB.
*   `useCampaigns()` reads from the DB and subscribes to changes.
*   `ClientGallery` updates `brief_data` JSONB columns for asset status/comments.

**4. Performance:**
*   Image compression implemented in `utils/fileHelpers.ts` before sending to Vision AI to respect payload limits.
