# 📸 FashionOS: AI Shoot & Campaign Wizard System

**Version:** 1.0  
**Status:** Product Specification  
**Architecture:** Gemini 3 Pro (Reasoning) + Gemini 3 Flash (Fast Suggestions)

---

## 1. Product Goal
The Shoot Wizard is the "Decision Engine" of FashionOS. It moves beyond asset creation to answer the fundamental brand question: 
> "What content should we create next to increase sales or impact?"

The system bridges the gap between raw brand data (URLs, Social, E-commerce) and an actionable production plan.

---

## 2. Information Architecture & Funnel
The user journey is linear but decision-supported:
1. **Mode Selection**: Choice between Manual and AI-Powered paths.
2. **AI Brand Intake**: Ingestion of digital presence (Website, Instagram, Amazon/Shopify).
3. **AI Analysis State**: Transparent processing indicator building trust.
4. **Enhanced Shoot Wizard**: Context-aware configuration with an AI Recommendation Sidebar.
5. **AI Strategy Summary**: The synthesis of the "Why" behind the "What".
6. **Proposal & Booking**: Finalization of deliverables and logistics.

---

## 3. Detailed Screen Specifications

### S1: Mode Selection
- **Purpose**: Direct users to the high-value AI path while offering a manual fallback.
- **AI Path Value**: Analyzes brand DNA, suggests optimal shoot plans based on current trends.
- **Requirement**: Clear distinction that users approve every machine-suggested step.

### S2: AI Brand Intake
- **Inputs**:
  - Website URL (Base identity)
  - Instagram Handle (Visual tonality)
  - Amazon / Shopify Link (Product focus)
  - Target Keywords (Strategic intent)
- **Tech**: Uses **Gemini URL Context** and **Search Grounding** to identify brand positioning.

### S3: Enhanced Shoot Wizard (Step-by-Step)
Each step features a persistent **AI Recommendation Sidebar** (Collapsible).
- **Steps**: Shoot Type, Category, Visual Style, Scenes, Talent, Upgrades, Distribution Channels.
- **AI Sidebar Logic**:
  - **Suggestion**: "We recommend a 3-scene Editorial Campaign."
  - **Rationale**: "Based on your current Instagram consistency vs. competitor [X]."
  - **Confidence**: Visual meter.
  - **Action**: [Apply Suggestion] button to auto-fill the current step.

### S4: AI Strategy Summary (The "Decision" View)
A dual-column final review.
- **Left**: The user’s selected/edited plan.
- **Right (AI Insight Panel)**:
  - **Shot Mix**: Optimal ratio of video vs. still.
  - **ROI Indicators**: Predicted engagement boost for specific channels.
  - **Risk Alerts**: "High competition for this aesthetic in Q3."
  - **Trend Badges**: Links to Grounding sources (Vogue, WGSN, etc.).

---

## 4. Gemini 3 Implementation Logic

| Feature | Model | Tool usage |
| :--- | :--- | :--- |
| **Strategy Synthesis** | Gemini 3 Pro | Thinking Config for deep reasoning on ROI. |
| **Inline Suggestions** | Gemini 3 Flash | Fast latency for UI updates during Wizard steps. |
| **Brand Audit** | Gemini 3 Pro | URL Context + Vision to analyze existing assets. |
| **Market Research** | Gemini 3 Pro | Search Grounding to verify competitor pricing/styles. |
| **Pricing Engine** | Function Calling | Maps AI-calculated scope to studio rates. |

---

## 5. Design System Integration
- **Tone**: Editorial, Calm, Precise.
- **Visuals**: High-contrast typography (`Playfair Display` + `Inter`), generous whitespace, and subtle purple/pink gradients for AI components.
- **Interactions**: Suggestions "slide in" rather than pop up. Luxury motion curves only.

---

## 6. Success Metrics
- **TTV (Time to Value)**: Complete a campaign brief from a URL in < 3 minutes.
- **Conversion**: Conversion from "Wizard Started" to "Deposit Paid".
- **Usage**: Adoption rate of AI Sidebar suggestions vs. manual input.