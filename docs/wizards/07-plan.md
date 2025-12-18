# 💎 FashionOS: AI-Powered Shoot & Campaign System

**Version:** 1.0 (Master Plan)
**Status:** Architecture Design Complete
**Role:** Lead Product Architect & AI Systems Engineer
**Engine:** Gemini 3 Pro (Reasoning), Gemini 3 Flash (Real-time), Gemini Vision (Visual DNA), Veo 3.1 (Cinematics)

---

## 📊 I. Progress & Readiness Tracker

| Module | Status | Logic Tier | UX Maturity | AI Integration |
| :--- | :--- | :--- | :--- | :--- |
| **Identity & Ingestion** | 🟢 Ready | URL Context | High | Deep Research (Pro) |
| **Strategic Planning** | 🟢 Ready | Thinking | High | ROI Reasoning (Pro) |
| **Operational Wizard** | 🟢 Ready | Flow Logic | High | Fast Suggestions (Flash) |
| **Visual Pre-viz** | 🟡 Alpha | Generative | Medium | Imagen 4.0 |
| **Motion Pre-viz** | 🟡 Alpha | Video Gen | Medium | Veo 3.1 |
| **Live Production Desk** | 🔴 Blueprint | Real-time | Low | Telemetry Logic |
| **B2B Distribution** | 🔴 Blueprint | E-com Logic | Medium | Merchandising Bot |

---

## 🏗️ II. Core Feature Set (Phase 1)

### 1. Signal-to-Brief Ingestion
*   **The "Digital Handshake":** A zero-entry onboarding flow where the user provides a URL.
*   **Aesthetic Mapping:** Gemini Vision analyzes the website and Instagram feed to extract dominant colors, font archetypes, and visual "Vibe" (e.g., *Industrial Minimalism*).
*   **Benchmarking:** Gemini 3 Pro uses Search Grounding to compare the brand against 3 verified competitors.

### 2. The Enhanced Campaign Wizard
*   **Contextual Guardrails:** A persistent AI sidebar that changes advice based on the current step.
*   **Strategic ROI Logic:** Every selection (e.g., "Add 5 Social Teasers") displays a "Directional Impact" tag (e.g., *High Engagement Potential*).
*   **Pricing Engine:** A real-time calculator that maps AI-suggested scope to production tiers.

### 3. AI Strategy Summary (The "Brain")
*   **Shot Plan Generation:** A structured list of stills and videos prioritized by "Must Haves" vs. "Nice to Haves".
*   **Rationale Blocks:** Explanations for *why* specific shots are recommended based on current market trends found via Search.

---

## 🧠 III. Advanced Intelligence (Phase 2)

### 1. "Showrunner" Agent (Live Operations)
*   **Risk Sentinel:** Monitors external signals (Weather, Traffic, Talent Alerts).
*   **Dynamic Re-scheduling:** If an outdoor shoot is hit by rain, the AI Showrunner suggests an immediate swap with an indoor scene in the Dashboard.

### 2. "Cura" (Casting & Venue Scout)
*   **Aesthetic Matching:** Multimodal comparison of brand moodboards against talent portfolios in the Directory.
*   **Vector Search:** Using `pgvector` in Supabase to find "Visual Twins" for specific aesthetics.

### 3. "Digital Merchandiser" (B2B Fulfillment)
*   **Showroom Optimization:** Recommends specific product assortments to retailers based on their location and historical buy.
*   **Inventory Logic:** Automatically flags broken size-runs or unmet MOQs during the wholesale checkout.

---

## 🗺️ IV. User Journeys & Workflows

### 1. The "Sprint to Production" (Creative Director)
*   **Entry:** Landing Page -> clicks "Scan My Brand".
*   **Intake:** Pastes URL.
*   **Analysis:** Watches "AI Thinking" visualization.
*   **Review:** Receives 5-page Strategic Brief.
*   **Action:** Approves Shot List -> Project appears in Dashboard.
*   **Outcome:** Pre-production time reduced from 2 weeks to 2 minutes.

### 2. The "Crisis Management" (On-Set Producer)
*   **Entry:** Dashboard -> Live Show Mode.
*   **Trigger:** Weather API flags "Heavy Rain in 15m".
*   **AI Action:** Assistant pulses red: "Risk Detected. Pivot to Studio Scene 4?".
*   **Action:** Producer clicks "Apply Change".
*   **Outcome:** All crew members receive a push notification with updated call times.

---

## 🛠️ V. The "FashionOS" AI Agent Roles

| Agent Name | Engine | Specialization | Tool Usage |
| :--- | :--- | :--- | :--- |
| **ARCHITECT** | Gemini 3 Pro | Strategy & Onboarding | URL Context, Search Grounding |
| **PRODUCER** | Gemini 3 Flash | Wizard Logic & UI | Code Execution (Pricing) |
| **CURA** | Gemini Vision | Casting & Visual DNA | Multimodal Comparison |
| **SCOUT** | Imagen 4.0 | Venue Visualization | Architectural Rendering |
| **MUSE** | Veo 3.1 | Teaser Generation | Cinematic Video Gen |

---

## 🔄 VI. System Logic & Data Model

### The "Loop of Truth"
1.  **Ingest:** `brand_signals` (JSONB)
2.  **Plan:** `creative_brief` (AI Generated + User Edited)
3.  **Produce:** `shot_list` (Live Tracking)
4.  **Analyze:** `performance_metadata` (ROI loop)

### Supabase Integration Points
*   **Storage:** `moodboards/`, `raw_assets/`, `final_delivery/`.
*   **Real-time:** Timeline updates during live events.
*   **Edge Functions:** All AI generation logic (prevents leaking API keys).

---

## ✅ VII. Production Readiness Checklist

- [ ] **Auth Parity:** RLS policies enforced for all B2B and Brand data.
- [ ] **Latency Budget:** Ingestion tasks < 15s; UI suggestions < 1s.
- [ ] **Visual Consistency:** No "Standard SaaS" UI; must maintain Editorial Luxury aesthetic.
- [ ] **Error Fallback:** If Gemini API times out, revert to high-fidelity local templates.
- [ ] **Accessibility:** All AI-generated content includes readable descriptions for screen readers.

---

## 🚀 VIII. Execution Roadmap (7-Day Sprint)

*   **Day 1:** UI Foundation (The Luxury Grid) & Ingestion Logic.
*   **Day 2:** Campaign Wizard Step Controller & State management.
*   **Day 3:** AI Sidebar (Gemini 3 Flash) integration.
*   **Day 4:** Strategy Summary & Shot List Builder (Gemini 3 Pro).
*   **Day 5:** Image (Imagen) & Video (Veo) Pre-viz Integration.
*   **Day 6:** Dashboard Wiring & Live Show Mode Blueprint.
*   **Day 7:** Production Readiness Audit & Final UI Polish.