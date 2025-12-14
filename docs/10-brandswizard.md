
# FashionOS Brand Designer Wizard — Implementation Plan

**Version:** 1.1 (Validated)
**Status:** 🟡 **In Progress / Integration Phase**
**Role:** Senior Product Architect
**Date:** May 2025

---

## A) Progress Tracker

### 1. Screens & UX
| Component | Status | Notes |
| :--- | :---: | :--- |
| **Input Screen** | ✅ Completed | `InputStep.tsx` created. Captures URL/Handle. |
| **Analysis State** | ✅ Completed | `AnalysisStep.tsx` with multi-phase loading animation. |
| **Brand Overview** | ✅ Completed | "Identity Card" implemented in `BrandReport.tsx`. |
| **Audit Scoring** | ✅ Completed | 4-point scoring grid implemented. |
| **Timeline** | ✅ Completed | `BrandHealthTimeline.tsx` updated with dynamic props. |
| **Dashboard** | 🟡 In Progress | Widget states updated; data persistence verification ongoing. |

### 2. Architecture & Logic
| Module | Status | Notes |
| :--- | :---: | :--- |
| **Routing** | ✅ Completed | Route `/create-profile` active. Footer link verified. |
| **Data Model** | ✅ Completed | `BrandInput` and `BrandAuditResult` types defined. |
| **AI Integration** | ✅ Completed | `audit-brand` Edge Function using Gemini 3 Pro + Search. |
| **State Mgmt** | 🟡 In Progress | LocalStorage fallback active; Supabase DB sync pending. |
| **Charts** | ✅ Completed | `CompetitorGraph` implemented. |

---

## B) Wizard Overview

**Purpose:**
To convert a raw brand URL into a structured, strategic profile within 30 seconds, demonstrating immediate value through AI analysis before asking for registration/payment.

**Target User:**
Fashion Designers, Brand Owners, Creative Directors.

**Core Metric:**
Time-to-Value (TTV) < 30 seconds.

**Outcomes:**
1.  **Validation:** User feels "seen" and understood by the system.
2.  **Insight:** User learns something new about their market position.
3.  **Action:** User enters the ecosystem (Dashboard) with a pre-filled profile.

---

## C) Screens (Multistep UI/UX Plan)

### 1. Create Your Brand Profile (Input)
*   **Route:** `/create-profile`
*   **Goal:** Zero friction entry.
*   **Layout:** Centered editorial card on white canvas.
*   **Fields:**
    *   Brand Name (Text, Required)
    *   Website URL (URL, Required)
    *   Instagram Handle (Text, Optional)
*   **CTA:** "Analyze My Brand" (Black, Full width).
*   **Microcopy:** "Free AI brand audit included."

### 2. Analyzing Your Brand DNA (Loading)
*   **State:** Transition / Processing.
*   **Visual:** Pulsing radar/scanner animation (SVG). No spinners.
*   **Copy Cycle (4s duration):**
    1.  "Reading website structure..."
    2.  "Analyzing visual language..."
    3.  "Measuring market signals..."
    4.  "Benchmarking category..."
*   **Behavior:** Pre-fetches data via `audit-brand` Edge Function.

### 3. How the Market Sees Your Brand (Reveal)
*   **Component:** `BrandReport.tsx` (Top Section)
*   **Goal:** Verification & "The Magic Moment".
*   **Layout:** Split view.
    *   *Left:* "Identity Card" (Black card with holographic glow). Shows Name, Category, Vibe.
    *   *Right:* "Market Position" (Price Tier, Audience).
*   **Interaction:** User can click `Edit` icon to correct AI assumptions.

### 4. Brand Audit Overview (Scoring)
*   **Component:** `BrandReport.tsx` (Middle Section)
*   **Goal:** Constructive critique.
*   **Layout:** 2x2 Grid of Score Cards.
    1.  **Website Score:** UX/Speed/Clarity (0-100).
    2.  **Social Score:** Consistency/Engagement (0-100).
    3.  **Brand Score:** Storytelling/Identity (0-100).
    4.  **E-commerce Score:** Conversion potential (0-100).
*   **Visuals:** Progress bars with color coding (Red < 50, Yellow < 80, Green > 80).

### 5. Brand Health Timeline
*   **Component:** `BrandHealthTimeline.tsx`
*   **Goal:** Show momentum.
*   **Layout:** Vertical timeline nodes.
    *   *Past:* "Initial Audit" (Today).
    *   *Present:* "Identity Verification" (Done).
    *   *Future:* "Potential Trajectory" (+3 Months).
*   **Interaction:** Hovering over future nodes shows "Unlock Plan".

### 6. Brand Profile Dashboard
*   **Route:** `/dashboard/brand`
*   **Goal:** The permanent home for the data.
*   **Layout:** Standard Dashboard Layout.
*   **Actions:** "Book Shoot", "Update Inventory", "Connect Shopify".

---

## H) Scoring System

**Strategy:**
*   **0-40:** "Emerging" (Needs foundational work).
*   **41-70:** "Establish" (Good basics, needs optimization).
*   **71-100:** "Market Leader" (Scale and refinement).

**Calculation Strategy:**
AI provides signals; scoring logic is deterministic and computed server-side (or securely in client logic for MVP) to ensure consistency.

*   `Website Score`: Signals: Platform detection, H1 tags, image resolution.
*   `Social Score`: Signals: Posting cadence, bio clarity.
*   `Consistency`: Signals: Aesthetic keyword match rate between channels.

---

## I) Routes & Active Navigation

| Path | Component | Purpose |
| :--- | :--- | :--- |
| `/create-profile` | `DesignerWizardPage` | Entry point. |
| `/dashboard` | `Dashboard` | Exit point (Success). |

**Footer Link Rule:**
*   Label: **Create Your Profile**
*   Target: `/create-profile`
*   State: Highlighted when active.
