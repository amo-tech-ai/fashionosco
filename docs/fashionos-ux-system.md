# 💎 FashionOS UX System & Product Architecture

**Version:** 1.0  
**Role:** Senior Product Designer & UX Architect  
**Status:** Blueprint for Production  

---

## 1. INFORMATION ARCHITECTURE (IA)

FashionOS is structured as a **Linear Conversion Funnel** leading into a **Recursive Operational Loop**.

### A. Marketing & Discovery (Public)
*   **Landing (`/`)**: Brand authority. High-end visuals. Entry into AI tools.
*   **Services Grid (`/services`)**: Category exploration.
*   **Talent Directory (`/directory`)**: Peer-to-peer discovery.
*   **Marketplace (`/marketplace`)**: Productized services.

### B. Intent & Configuration (The Wizards)
*   **Brand Onboarding (`/create-profile`)**: Defining the "Digital Twin".
*   **Shoot Wizard (`/shoot-wizard`)**: Asset production planning.
*   **Event Wizard (`/event-wizard`)**: Live production planning.

### C. Execution & Management (The Dashboard)
*   **Overview**: Multi-project tracking.
*   **Brand Center**: Strategy & Market Intel.
*   **Shot List**: Granular task management.
*   **Gallery**: Asset review & feedback.
*   **Showroom**: B2B distribution.

---

## 2. CORE WORKFLOWS (END-TO-END)

### Workflow 1: Fashion Event Creation
1.  **Discovery**: Producer lands on Home, clicks "Plan an Event".
2.  **Event Wizard**:
    *   *Step 1*: Select "Runway Show".
    *   *Step 2*: Input "200 Guests", "Milan", "Sept 15".
    *   *Step 3*: Select "Turnkey Production" (includes AV, Catering).
3.  **AI Plan**: AI generates a draft "Run of Show" (Timeline) and matches 3 Milanese industrial venues.
4.  **Action**: Producer pays 50% deposit via Secure Modal.
5.  **Result**: Project spawns in Dashboard. Timeline is pre-filled with cues.

### Workflow 2: Service Booking (Photography)
1.  **Inspiration**: Brand Manager uploads a moodboard to the "Creative Still Life" page.
2.  **AI Analysis**: Gemini Vision extracts "Low Key lighting", "Velvet textures", "Emerald tones".
3.  **Shoot Wizard**: Auto-fills "Creative" step with AI insights. Suggests 3 photographers from Directory who match the aesthetic.
4.  **Booking**: User selects "Elena Rodriguez", adds "Video BTS" add-on.
5.  **Result**: Production Dashboard opens. AI generates a 20-point Shot List.

### Workflow 3: AI Assistant Navigation (Omni-Concierge)
1.  **Trigger**: User (anywhere) clicks FAB or asks "I need to add a model to my beach shoot".
2.  **Understanding**: AI identifies Intent (`BookTalent`) and Context (`BeachShoot`).
3.  **Navigation**: Assistant replies: "I've found 3 models available for your date. [View Matches]".
4.  **Execution**: User clicks "View Matches" -> AI navigates to Directory with filters applied.
5.  **Confirmation**: User books -> Assistant confirms: "Sarah Jenkins added to crew. Updating Call Sheet. [Download PDF]".

---

## 3. UI/UX DESIGN SYSTEM (EDITORIAL LUXURY)

### Typography
*   **Serif**: `Playfair Display`. Used for impact, brand names, and storytelling.
*   **Sans**: `Inter`. Used for data, navigation, and functional UI.

### Spacing & Grid
*   **Luxury Margin**: Standard 80px - 120px padding between sections.
*   **Line Weights**: 1px borders (`#E5E5E5`) for a precise, "blueprint" feel.

### Component Logic
*   **Cards**: Minimal shadows. Sharp corners (0px or 4px radius). High contrast on hover.
*   **Buttons**: Uppercase, wide tracking. High contrast (Black background for primary).
*   **AI Indicators**: Subtle purple glow (`#A855F7`) and "Sparkle" icon to denote machine intelligence.

---

## 4. AI AGENTS & RESPONSIBILITIES

| Agent | Trigger | Inputs | Output |
| :--- | :--- | :--- | :--- |
| **Orchestrator** | Global Assistant FAB | Text / Voice | Intent Routing & Navigation |
| **Vision Scout** | Moodboard Upload | Images | Aesthetic Tags, Lighting Diagrams |
| **Merchandiser** | Showroom Cart | SKU List | Assortment Gap Analysis, Pricing Strategy |
| **Producer** | Wizard Deliverables | Vibe + Item Count | Priority-ranked Shot List |
| **Risk Analyst** | B2B Application | URL + Address | Risk Score (0-100), Verdict |

---

## 5. REAL-WORLD USE CASES

1.  **The "Last Minute" Pivot**: Runway show is 24h away. A model cancels. Assistant finds verified backup in 2 clicks.
2.  **The "Market Entry"**: Emerging brand from NYC wants to sell in Tokyo. AI Merchandiser analyzes Tokyo retail trends and suggests a "Linen Capsule" from their existing catalog.
3.  **The "Visual Alignment"**: Creative Director wants to ensure Instagram matches the website. AI Brand Audit flags a color mismatch and suggests a new lighting setup for the next shoot.
