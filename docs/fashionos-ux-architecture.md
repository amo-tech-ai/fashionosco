# 💎 FashionOS: UI/UX Architecture & Product Specification

**Version:** 1.0  
**Role:** Senior Product Designer & UX Architect  
**Status:** Design Handoff / Production Blueprint  
**Theme:** Editorial Luxury / Calibrated Intelligence

---

## 1. INFORMATION ARCHITECTURE (IA)

FashionOS is structured to move the user from **Inspiration** (Marketing) to **Intention** (Wizard) to **Execution** (Dashboard).

### A. Marketing (Public)
- **Landing (`/`)**: High-level value prop. Entry point for AI Assistant "Quick Start".
- **Services (`/services/*`)**: Deep dives into specific capabilities (Photo, Video, Events).
- **Use Cases (`/use-cases/*`)**: Narrative-driven social proof.
- **Directory (`/directory`)**: Public-facing library of talent, venues, and vendors.

### B. Workspace (Private)
- **Wizards (`/wizard/*`)**: Linear, distraction-free configuration flows.
- **Project Dashboard (`/dashboard`)**: Central hub for an active production.
- **Asset Gallery (`/gallery`)**: Delivery and feedback loop for creative work.
- **B2B Showroom (`/showroom`)**: Wholesale marketplace and order management.

### C. The Concierge Layer
- **AI Assistant**: A persistent sidebar/modal that maintains context across all routes. It is the "connective tissue" of the OS.

---

## 2. UI / UX SCREENS (WIREFRAMES)

### S1: Landing / Entry
- **Purpose:** Establish brand authority and capture intent.
- **Sections:** Cinematic Hero, "Pulse" Market Metrics, AI Assistant FAB.
- **Primary CTA:** "Initialize Campaign" (Starts Wizard).
- **AI Role:** Intent parser (Text/Image prompt).
- **Next Screen:** S6 (Wizard) or S4 (Directory).

### S2: Directory / Discovery
- **Purpose:** Surface the network of talent and resources.
- **Sections:** Multi-modal Search, Style Masonry, Role Filters.
- **Primary CTA:** "View Profile".
- **AI Role:** Semantic matching ("Find someone like [Artist]").
- **Next Screen:** S3 (Detail Page).

### S3: Detail Page (Talent/Venue)
- **Purpose:** Conversion and vetting.
- **Sections:** 4K Reel/Portfolio, Verified Credits, Day Rates, Availability.
- **Primary CTA:** "Book for Project".
- **AI Role:** Availability verification & price negotiation assistant.
- **Next Screen:** S6 (Wizard).

### S4: The "Runway" Wizard (Multi-step)
- **Purpose:** Complex project configuration.
- **Sections:** Step Progress, Visual Reference Upload, Logic Form, Pricing Preview.
- **Primary CTA:** "Approve Brief".
- **AI Role:** Logic enforcement (MOQs, Crew sizing, Timeline calculation).
- **Next Screen:** S8 (Success) -> S5 (Dashboard).

### S5: Production Dashboard
- **Purpose:** Execution management.
- **Sections:** KPI Cards, Interactive Timeline, Deliverable Status, Team Chat.
- **Primary CTA:** "Review Assets".
- **AI Role:** Risk sentinel (Alerts for delays, weather, or budget).
- **Next Screen:** S7 (Gallery).

---

## 3. CORE WORKFLOWS

### Workflow 1: Fashion Event Creation
1. **User:** "I want to host a 200-person runway show in Milan next September."
2. **AI Assistant:** Triggers **Event Wizard** pre-filled with "Milan" and "Runway".
3. **Wizard Step 2:** Suggests 3 verified Industrial Venues.
4. **Wizard Step 3:** AI generates a **Run of Show** (Timeline).
5. **Outcome:** Project created in Dashboard with automated tasks for catering and security.

### Workflow 2: Service Booking (Photography)
1. **User:** Uploads a moodboard to the **Service Page**.
2. **AI Vision:** Analyzes vibe ("Minimalist / High-Contrast") and category ("Outerwear").
3. **Booking Wizard:** Recommends 3 photographers from the **Directory** matching the aesthetic.
4. **User:** Selects photographer and pays deposit.
5. **Outcome:** Production starts; AI creates a **Shot List** automatically.

---

## 4. FEATURES & FUNCTIONALITY

| Feature | Problem Solved | Living Location |
| :--- | :--- | :--- |
| **Sponsor Matcher** | Manual deck outreach is slow. | Event Dashboard |
| **Digital Twin Audit** | Manual data entry for brand onboarding. | Wizard Step 1 |
| **Smart Shot List** | Creative block during planning. | Shoot Wizard |
| **Risk Sentinel** | Unforeseen logistics failures. | Global Notification |
| **B2B Merchandiser** | Wholesale assortment errors. | Showroom Cart |

---

## 5. USER JOURNEYS

### 1. The Creative Director (First-Time)
- **Entry:** Landing Page via Referral.
- **Path:** Clicks "Free Brand Audit" -> AI scans URL -> Displays Report -> Suggests "Campaign Refresh" -> Starts Shoot Wizard.
- **Outcome:** Conversion to active client in < 5 mins.

### 2. The Producer (Power User)
- **Entry:** Direct login to Dashboard.
- **Path:** Reviews Event Timeline -> AI flags "Model A has a flight conflict" -> User asks AI to "Find local backup" -> AI suggests 2 vetted replacements -> User approves.
- **Outcome:** Crisis averted with 2 clicks.

---

## 6. AI ASSISTANT — AGENTS & ACTIONS

### Main Orchestrator (The Concierge)
- **Role:** Route requests to specialized sub-agents.
- **UI:** Minimalist Chat + Action Buttons.

### The "Scout" (Sourcing Agent)
- **Trigger:** "Find a [Role] in [City]"
- **Action:** Searches `stakeholders` and `venues` tables + Google Search Grounding.
- **Output:** Structured Comparison Card.

### The "Planner" (Operations Agent)
- **Trigger:** "Generate timeline" or "Shorten show by 10 mins".
- **Action:** Code Execution (for math) + Gemini Thinking.
- **Output:** Interactive Timeline update.

---

## 7. INTERACTIONS & MOTION

- **State Transitions:** Cross-fade between Wizard steps (400ms ease-in-out).
- **AI Suggestion:** Subtle "sparkle" pulse on UI elements the AI can "Magic Fill".
- **Action Confirmation:** Slide-up bottom sheet for high-stakes approvals.
- **Tone:** The UI should feel like a butler: silent until needed, then incredibly precise.

---

## 8. DESIGN SYSTEM (LIGHT)

- **Palette:** 
  - Neutral Base: `#0A0A0A` (Black) / `#FFFFFF` (White)
  - Accent: `#A855F7` (AI Intelligence - used only in icons/glows)
  - Success: `#22C55E` (Verified)
- **Type:** 
  - Headlines: `Playfair Display`, Regular (Editorial)
  - Body: `Inter`, 400-600 (Swiss Minimalist)
- **Cards:** 
  - Border: 1px `#E5E5E5`
  - Radius: 12px (Soft Luxury)
  - Shadow: Large, blurred, low-opacity.

---

## 9. NEXT STEPS (ENGINEERING)
1. Implement `AssistantProvider` to maintain chat history across routes.
2. Build the `SmartCard` component for AI-generated recommendations.
3. Wire the `IntentRouter` Edge Function to Gemini 3 Pro.
