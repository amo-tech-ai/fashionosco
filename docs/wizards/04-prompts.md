# 🚀 FashionOS: AI System Mega-Prompts

This document provides high-fidelity, multi-step prompts designed for **Gemini 3 Pro** to build out the FashionOS ecosystem. These prompts follow the "Super Prompt" methodology: defining roles, constraints, visual language, and specific technical requirements.

---

## 🏛️ Phase 1: Global Design Language & Shell

### Prompt 01: The "Calm Luxury" UI System
> **Role:** Senior Product Designer & Design System Architect.
> **Task:** Define the visual design language for "FashionOS", a premium AI-native SaaS for fashion production.
> 
> **Requirements:**
> 1. **Typography:** Select an elegant Display Serif (e.g., Playfair Display) for editorial headers and a high-utility Sans-Serif (e.g., Inter or Geist) for data.
> 2. **Palette:** Define a "Calm Luxury" palette: Bone White (#FCFBFA), Rich Black (#0A0A0A), and a "Gemini Glow" gradient (Purple to Rose at 5% opacity for AI elements).
> 3. **Components:** Design systematic wireframes for:
>    - **Luxury Cards:** Minimalist, 1px borders, generous padding (32px), subtle hover "lifts".
>    - **Interactive Badges:** Pill shapes with micro-copy (e.g., "AI Verified", "High Impact").
>    - **Editorial Headings:** Wide-tracked uppercase sub-headers.
> 4. **Responsive Logic:** Define stacking rules for Mobile (single column, sticky CTAs) and Tablet (2-column masonry).
> 
> **Output:** Markdown documentation of the system with Tailwind utility class mappings.

---

## 🖥️ Phase 2: Screen-Specific Implementation

### Prompt 02: S1 — Plan Your Campaign (The Gateway)
> **Role:** Lead UX Architect.
> **Purpose:** Route users into an AI-powered creative flow vs manual setup.
> 
> **Layout Requirements:**
> - Center-aligned, vertically balanced layout.
> - **Primary Card:** "AI Creative Partner". High-contrast, features a "Recommended" badge with a subtle pulse animation.
> - **Secondary Link:** "Manual setup" for legacy users, styled as a subtle text link with underline on hover.
> - **Action:** The AI path must trigger an "Intent Parsing" transition.
> 
> **Output:** Step-by-step UI layout description and responsive wireframe logic.

### Prompt 03: S2 — Brand Signal Capture (Multimodal Input)
> **Role:** Senior Data Pipeline Designer & UX Lead.
> **Purpose:** Ingest digital signals (URLs, Handles) for the AI Researcher Agent.
> 
> **Layout Requirements:**
> - A "Connector" interface rather than a standard form.
> - **Signal Inputs:** 
>   - Website (URL context tool target).
>   - Instagram (Visual tonality target).
>   - Shopify/Amazon (Product parsing target).
> - **Behavior:** Pulse fields with purple borders when AI pre-fills or validates data.
> - **Copy:** Use technical but elegant micro-copy: "Synchronizing brand DNA..."
> 
> **Output:** Functional layout spec for a non-linear intake screen.

### Prompt 04: S3 — AI Thinking (The Analysis State)
> **Role:** Motion Designer & AI UX Specialist.
> **Purpose:** Build trust during the 10-20s latency of deep Gemini reasoning.
> 
> **Visual Requirements:**
> - Central abstract "Thinking" orb using `framer-motion`.
> - **Status Loop:** Display rotating messages: "Studying market benchmarks...", "Analyzing visual consistency...", "Building campaign logic...".
> - **Trust Signals:** Add a badge: "Powered by Gemini 3 Pro + Thinking Engine".
> 
> **Output:** Detailed animation sequence and content timing plan.

### Prompt 05: S4 — Campaign Summary (The Intelligence Hub)
> **Role:** Lead Product Architect & AI Strategist.
> **Purpose:** Present the AI-generated strategy for approval/adjustment.
> 
> **Section Specs:**
> 1. **Strategy Card:** Displays Goal, Channels, and "AI Generated Strategy" badge.
> 2. **Extracted DNA:** Grid of colors and keywords found via Vision AI.
> 3. **AI Shot List:** Scrollable list with "Priority", "Rationale", and "Lighting Setup".
> 4. **ROI Matrix:** Directional indicators (High/Med/Low Impact) instead of fake percentages.
> 
> **Mode Switcher:**
> - [AI Recommended ✓] : Clean, read-only editorial view.
> - [Adjust Mode ✎] : Reveals edit controls on every card.
> 
> **Output:** Complete UI architecture for the "Brain" of the platform.

---

## 🤖 Phase 3: AI Agent & Logic Architecture

### Prompt 06: The "Production Lead" Agent (Gemini 3 Pro)
> **Role:** AI System Architect.
> **Task:** Write the system prompt and function calling definitions for a 'Production Lead' agent.
> 
> **Logic Requirements:**
> 1. **Inputs:** Moodboard Analysis JSON, Brand Profile, Item Count.
> 2. **Thinking Config:** Use 1024 token budget to balance "Commercial Utility" vs "Editorial Edge".
> 3. **Tools:** Integrate `googleSearch` to verify if the suggested theme (e.g., "Brutalist") is trending in current fashion media.
> 4. **Output:** A structured `ShotItem[]` array following a strict JSON schema.
> 
> **Output:** System prompt and JSON Schema definition.

---

## 🗺️ Phase 4: System Diagrams

### Prompt 07: Mermaid Architecture & Flow
> **Task:** Generate a comprehensive set of Mermaid diagrams for FashionOS.
> 
> **Requirements:**
> 1. **Flowchart:** The end-to-end "Signal to Shoot" journey.
> 2. **Sequence:** User ↔ Frontend ↔ Edge Function ↔ Gemini ↔ Search Tool.
> 3. **ERD:** Relationship between Brands, Campaigns, Shots, and Assets.
> 4. **State Diagram:** Handling "Draft", "Analyzing", "Review", "Approved".
> 
> **Output:** Valid Mermaid code blocks for documentation.

---

## ✅ Phase 5: QA & Production Readiness

### Prompt 08: Acceptance Tests & Checklist
> **Role:** Senior QA Engineer.
> **Task:** Create a systematic test suite for the AI onboarding journey.
> 
> **Structure:**
> - **Test Case:** "Zero Config Start". Given URL, When Analyzed, Then Output Identity JSON.
> - **Test Case:** "Adjust Mode Integrity". Verify users cannot edit state unless toggle is active.
> - **Resilience:** Handle "Empty Site" or "Broken Link" failure modes gracefully.
> 
> **Output:** Markdown checklist and Gherkin-style test scenarios.

---

## 📈 Phase 6: Content & Microcopy

### Prompt 09: Editorial Copy Generator
> **Role:** Editorial Director for a high-fashion magazine.
> **Task:** Generate all micro-copy for the FashionOS Wizard.
> 
> **Guidelines:**
> - **Tone:** Calm, precise, professional, but visionary.
> - **Headlines:** Use short, punchy phrases: "Details that Define", "Market Coordinates".
> - **Empty States:** Encouraging and brief.
> 
> **Output:** A comprehensive Copy Table (Keys vs Content).