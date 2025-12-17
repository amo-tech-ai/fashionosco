# 💎 FashionOS: Sitemap & UX Workflows Documentation

**Version:** 1.0  
**Author:** Senior UX Architect  
**Project:** FashionOS "Hybrid" Production ERP  
**Status:** Production Audit

---

## 1. Executive Summary
FashionOS is an ultra-premium "Vertical Operating System" designed for the fashion industry. It bridges the gap between a high-end creative agency and a scalable SaaS platform. The system facilitates the entire campaign lifecycle: from brand identity auditing and talent discovery to AI-assisted production planning, wholesale distribution, and asset delivery.

---

## 2. Product Overview
The ecosystem is built on a **"Flat Root" Architecture** using React 19 and Vite, integrated with a robust **Supabase** backend. It leverages **Gemini 3 Pro** for deep reasoning (Shot Lists, Strategy) and **Gemini Vision** for visual intelligence (Moodboard analysis, Brand audits).

---

## 3. Sitemap

### 🟢 Phase A: Public Marketing & Discovery (Logged-Out)
- **Home (`/`)**: High-fashion editorial landing. Hero, Latest Campaigns, AI Suite Overview, Ecosystem Flow.
- **Services Overview (`/services`)**: Multi-category grid (Photo, Video, Web, Ecom, Social, AI).
  - **Product Photography (`/services/product-photography`)**: Specialist landing page.
  - **Clothing Photography (`/services/clothing-photography`)**: Specialist landing page.
  - **Ecommerce (`/services/ecommerce`)**: Conversion-focused landing page.
  - **Creative Still Life (`/services/creative-still-life`)**: High-concept landing page.
  - **Video Production (`/services/video-production`)**: Motion & AI Video preview tool.
  - **Instagram Services (`/services/instagram`)**: Social growth toolset (Caption Gen, Viral Scorer).
- **Directory (`/directory`)**: Searchable talent network. AI-powered semantic matching.
  - **Talent Profile (`/directory/:id`)**: Individual portfolio, reviews, and direct booking entry.
- **Marketplace (`/marketplace`)**: Pre-packaged shoot bundles (e.g., "Lookbook Starter").
- **BTS (`/bts`)**: "Behind the Scenes" cultural immersion and studio trust-building.
- **Wholesale Application (`/wholesale/apply`)**: B2B entry point with AI vetting flow.

### 🟡 Phase B: Entry & Onboarding (The Wizards)
- **Designer Onboarding (`/create-profile`)**: Zero-entry brand architect. URL -> AI Research -> Strategy Report.
- **Shoot Booking (`/shoot-wizard`)**: 7-step production planner. Concept -> AI Shot List -> Payment.
- **Event Planning (`/event-wizard`)**: 4-step logistics flow for runway shows and parties.
- **Talent Profile Builder (`/talent-wizard`)**: Scrapes social/web to auto-generate a verified profile.
- **Login (`/login`)**: Auth entry point (Email, Google OAuth).

### 🔵 Phase C: The Workspace (Logged-In Dashboard)
- **Studio Overview (`/dashboard`)**: KPI grid, real-time activity feed, next-best-actions.
- **Brand Command Center (`/dashboard/brand`)**: Health scores, competitor watch, pricing strategy.
- **Production Shot List (`/dashboard/shotlist`)**: Interactive Kanban board for active shoots. AI Copilot enabled.
- **Inventory Manager (`/dashboard/products`)**: SKU management, "Magic Import" from PDFs.
- **Client Proofing Gallery (`/dashboard/gallery`)**: Lightbox review, pin-comments, retouching queue.
- **Production Calendar (`/dashboard/calendar`)**: Integrated schedule of all shoots and events.
- **Digital Showroom (`/wholesale/showroom`)**: B2B ordering interface with AI Merchandiser.
- **Seating Chart (`/dashboard/seating`)**: Drag-and-drop floor plan for events.
- **Billing (`/dashboard/billing`)**: Invoices and transaction history.
- **Settings (`/dashboard/settings`)**: Profile, Company, and System Health management.

---

## 4. Multi-Step Wizards Audit

### I. Shoot Wizard (7 Steps)
1. **Type**: Select category (Campaign, Ecom, Runway, etc.).
2. **Details**: Input item count, location (Studio/On-site), and date.
3. **Creative**: Upload moodboard. **AI Action**: Vision analysis extracts palette, lighting, and vibe.
4. **Talent**: Choose models, stylists, and MUAs.
5. **Deliverables**: **AI Action**: Gemini 3 Pro generates a structured, prioritized shot list.
6. **Add-Ons**: Select retouching level, video BTS, and usage rights.
7. **Review**: Price breakdown, 50% deposit payment via Secure Modal.

### II. Brand Designer Wizard (3 Phases)
1. **Input**: Enter Website URL and Instagram handle.
2. **Analysis**: **AI Action**: Deep Research Agent scans web, press, and social.
3. **Outcome**: Strategic Brand Report with Score, Market Gap, and Competitor Matrix.

---

## 5. Core User Journeys

### Journey 1: The "Lead-to-Active" Flow
Visitor lands on **Home** → Explores **Services** → Uses **Viral Scorer** on Instagram Page → Impressed by AI value → Enters **Shoot Wizard** → Configures Campaign → Pays Deposit → Enters **Dashboard** as an active client.

### Journey 2: The "B2B Retailer" Flow
Retailer applies on **Wholesale** page → **AI Risk Agent** verifies store address and brand adjacencies → Approved → Enters **Digital Showroom** → Adds products to assortment → **AI Merchandiser** suggests missing categories → Submits **Purchase Order**.

### Journey 3: The "Talent-to-Network" Flow
Photographer finds **Directory** → Clicks "Join Network" → Uses **Talent Wizard** with Instagram URL → AI builds their **Portfolio** → Publishes → Becomes discoverable by Producers in the **Directory**.

---

## 6. Key Workflows

### Workflow: AI Shot List Generation
Designer uploads Moodboard → AI Vision extracts "Moody/Linen/Minimal" → Designer requests "30 Shots" → **Gemini Thinking** reasons about composition → Returns JSON list → User edits/reorders in UI → Syncs to **Shot List Dashboard**.

### Workflow: Client Feedback Loop
Studio uploads photos to **Gallery** → Client receives notification → Client opens **Lightbox** → Clicks on image to **Drop Pin** → Leaves comment "Brighten hemline" → Status set to "Retouching" → Notification sent back to Studio.

---

## 7. AI & Automation Touchpoints

| AI Category | Implementation | User Control |
| :--- | :--- | :--- |
| **Vision Intelligence** | Moodboard analysis, Brand visual audit, Line sheet parsing. | Users upload images; can override extracted tags. |
| **Reasoning (Thinking)** | Shot list logic, pricing strategies, market gap analysis. | Users provide constraints; AI suggests the "Plan". |
| **Search Grounding** | Competitor research, trend tracking, talent verification. | Transparently cites real-world brands/data. |
| **Generative Video** | Concept previews for video production (Veo). | User prompts the "vibe" to see a preview before booking. |

---

## 8. Gaps & Opportunities

1. **Collaboration (Friction)**: Currently, the system is designed for a single user per brand. **Opportunity**: Implement "Invite Team" logic for multi-player production management.
2. **Real-time Comms**: Dashboard relies on activity feeds. **Opportunity**: Integrated chat/Slack notifications for shot approvals.
3. **Data Depth**: The Directory is currently based on metadata. **Opportunity**: Visual similarity search (e.g., "Find more photographers who look like this specific photo").

---

## 9. Next Steps
- Finalize the **Event Timeline** integration into the Dashboard.
- Connect the **Seating Chart** component to real guest list data.
- Standardize **PDF Exports** across Line Sheets, Call Sheets, and Purchase Orders.