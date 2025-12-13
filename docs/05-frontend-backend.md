
# FashionOS System Integration Plan & Architecture (v1.0)

**Role:** Senior Systems Architect
**Date:** May 2025
**Status:** **READY FOR IMPLEMENTATION**

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

### Phase 3: Implementation (🚧 Ready to Start)
- [ ] **Auth Integration**: Replace mock login with Supabase Auth (Email/Magic Link).
- [ ] **DB Wiring**: Connect `CampaignService` to `shoots` and `events` tables.
- [ ] **Realtime Updates**: Enable subscriptions for Dashboard activity feed.
- [ ] **Storage**: Wire `moodBoardImages` to Supabase Storage buckets.
- [ ] **Payment**: Integrate Stripe Checkout via Edge Functions.

---

## PART 1 — Setup Audit (Current State)

### A) Frontend (React/Vite)
*   **Framework:** React 19 + Vite. Solid, modern foundation.
*   **State:** Heavy reliance on `React.Context` + `localStorage` for persistence.
    *   *Risk:* `localStorage` has a 5-10MB limit. High-res moodboards will crash the app in production.
*   **API Layer:** Scattered `fetch` calls inside `src/services/ai/*.ts`.
    *   *Action:* Needs consolidation into a unified `api` client with interceptors for Auth headers.
*   **Auth:** Currently simulated (`localStorage.setItem('auth_session', 'true')`).
    *   *Action:* Must be replaced with `SupabaseProvider` context.

### B) Backend (Supabase Edge Functions)
*   **Technology:** Deno-based Edge Functions.
*   **Current Functions:**
    *   `generate-shot-list` (Gemini 3 Pro)
    *   `analyze-mood-board` (Gemini 3 Pro Vision)
    *   `generate-captions` (Gemini 3 Pro)
    *   `audit-profile` (Gemini 3 Pro)
    *   `predict-engagement` (Gemini 3 Pro)
*   **Status:** Functions are correctly implemented with CORS headers and Gemini SDK integration.
*   **Missing:** Database triggers (e.g., "On Shoot Created -> Generate Notification").

### C) Database (Supabase PostgreSQL)
*   **Schema:** 50 tables defined. Comprehensive coverage for Users, Events, Shoots, Assets, and Commerce.
*   **RLS (Row Level Security):** Critical. Currently, the schema exists but RLS policies need to be explicitly applied to prevent users from seeing other agencies' data.

---

## PART 2 — Target Architecture

We will implement **Option A: Supabase-Centric Architecture**.

### Why?
1.  **Unified Auth & Data:** JWTs from Supabase Auth automatically work with RLS in the Database and are easily passed to Edge Functions.
2.  **Realtime:** FashionOS is collaborative (Teams). Supabase Realtime is essential for the "Command Center" dashboard.
3.  **Simplicity:** No need to manage a separate Node/Express server.

### The Wiring Model

1.  **Frontend (React):**
    *   Initializes `createClient(SUPABASE_URL, SUPABASE_ANON_KEY)`.
    *   Manages Auth Session.
    *   Calls Database directly for CRUD (protected by RLS).
    *   Calls Edge Functions for AI/Complex Logic (passing Auth Token).

2.  **Backend (Edge Functions):**
    *   Receives Request + User JWT.
    *   Validates User via `supabase.auth.getUser()`.
    *   Calls **Gemini API** (Server-side API Key `Deno.env.get('GEMINI_API_KEY')`).
    *   Returns JSON to Frontend.

3.  **Security Rules:**
    *   **NEVER** expose `GEMINI_API_KEY` or `STRIPE_SECRET_KEY` in `src/`.
    *   **ALWAYS** enable RLS on all tables.
    *   **ALWAYS** use `service_role` key *only* inside Edge Functions, never in React.

---

## PART 3 — Frontend ↔ Backend Wiring Plan

### 1. API Surface Map

| Feature | Endpoint / Method | Location | Auth | Inputs | Outputs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Login** | `supabase.auth.signInWithPassword` | SDK | Public | Email, Pass | Session |
| **Profile** | `GET /rest/v1/profiles` | DB | User | UUID | Profile Obj |
| **Wizard Save**| `POST /rest/v1/shoots` | DB | User | JSON (Shoot Data) | Shoot ID |
| **AI Shot List**| `POST /functions/v1/generate-shot-list` | Edge | User | { vibe, items... } | JSON (Shots) |
| **Moodboard** | `POST /functions/v1/analyze-mood-board` | Edge | User | { images[] } | JSON (Analysis) |
| **Assets** | `POST /storage/v1/object/upload` | Storage | User | File Blob | URL |
| **Directory** | `GET /rest/v1/stakeholders` | DB | Public/User | Filter Params | Array[] |

### 2. Frontend Client Layer Strategy

Create a singleton client in `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Optimistic UI Strategy for Wizards:**
1.  **Local Cache:** Continue using `useReducer` + `localStorage` for *draft* state (speed).
2.  **Background Sync:** On "Next Step", fire a non-blocking `supabase.from('shoots').upsert()` call.
3.  **Final Commit:** On "Payment/Confirm", perform a blocking save and clear local cache.

### 3. Auth & Permissions Wiring

**Role Model (RBAC):**
*   Stored in `public.profiles` table: `role` column ('admin', 'producer', 'talent').
*   **Frontend Guard:** `<ProtectedRoute allowedRoles={['producer']} />` wrapper component.
*   **Backend Guard:** RLS Policy: `create policy "Producers can view own shoots" on shoots for select using (auth.uid() = client_id);`

### 4. AI Wiring (The "Gemini Pipeline")

**Flow:**
1.  User clicks "Generate Shot List".
2.  Frontend: `await supabase.functions.invoke('generate-shot-list', { body: { ...params } })`.
3.  **Edge Function:**
    *   Checks Auth.
    *   Calls Gemini 3 Pro with `thinkingConfig`.
    *   **Crucial Step:** Stores the *result* in the database (`shoot_briefs` table) *before* returning to frontend. This ensures we don't lose the AI output if the browser crashes.
4.  Frontend receives data and updates React State.

---

## PART 4 — Implementation Checklist (Step-by-Step)

### Day 1: Foundation & Auth
1.  [ ] Install `@supabase/supabase-js`.
2.  [ ] Initialize `supabase` client.
3.  [ ] Create `AuthProvider` context replacing mock auth.
4.  [ ] Connect Login page to `supabase.auth.signIn`.

### Day 2: Data Wiring (The Dashboard)
5.  [ ] Create `useCampaigns` hook that fetches from `shoots` table instead of `localStorage`.
6.  [ ] Update `Dashboard.tsx` to consume this hook.
7.  [ ] Create RLS policies for `shoots` (Users can only see their own).

### Day 3: The Wizards (Complex State)
8.  [ ] Update `ShootWizardContext` to save drafts to DB on step change.
9.  [ ] Wire `CreativeDirectionStep` upload to Supabase Storage (Bucket: `moodboards`).
10. [ ] Update `DeliverablesStep` to call Edge Function via `supabase.functions.invoke`.

### Day 4: Commerce & Final Polish
11. [ ] Create `payments` Edge Function (Stripe wrapper).
12. [ ] Connect "Pay Deposit" button to payment function.
13. [ ] Run E2E test: Login -> Create Shoot -> AI Plan -> Pay -> Dashboard.

---

## PART 5 — Verification & Tests

**1. Auth Sanity Test:**
*   Open App in Incognito.
*   Try to access `/dashboard`. Should redirect to `/login`.
*   Login. Should see *only* your data.

**2. AI Resilience Test:**
*   Disconnect Internet.
*   Click "Generate Shot List".
*   App should show "Network Error" toast (not crash).
*   Reconnect. Retry. Should work.

**3. Data Persistence Test:**
*   Start a Wizard. Upload images.
*   Close tab.
*   Reopen.
*   Wizard should resume *exactly* where left off (fetching state from DB).

**4. Performance Test:**
*   Upload 5x 4K images to Moodboard.
*   Ensure frontend compresses them (client-side) before sending to Edge Function to avoid 6MB payload limit.

