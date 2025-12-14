
# FashionOS B2B Wholesale Marketplace Architecture

**Version:** 1.0
**Status:** Architecture & Strategy
**AI Model:** Gemini 3 Pro Integrated

---

## 📊 1. Progress Tracker & Readiness

| Module | Status | Production Ready? | AI Integration |
| :--- | :---: | :---: | :--- |
| **Marketplace Strategy** | 🟢 **Done** | ✅ Yes | N/A |
| **Shopify B2B Graph Connection** | 🟡 **Pending** | ❌ No | N/A |
| **Buyer Vetting Engine** | 🟡 **Pending** | ❌ No | **High** (Search Grounding + URL Context) |
| **Visual Matchmaking** | 🔴 **Missing** | ❌ No | **High** (Multimodal Vision) |
| **Wholesale Order Flow** | 🔴 **Missing** | ❌ No | **Medium** (Code Execution for logic) |
| **Trust & Credit Scoring** | 🔴 **Missing** | ❌ No | **High** (Thinking Mode) |

### ✅ Success Criteria
1.  **Zero-Friction Sync:** Products/Inventory sync live from Designer's Shopify to Marketplace.
2.  **High-Fidelity Vetting:** AI successfully flags 90% of "bad actor" buyer applications automatically.
3.  **Order Accuracy:** 100% of orders respect MOQ (Minimum Order Quantity) and Case Pack logic.
4.  **Performance:** Discovery search < 200ms latency.

### 🚧 Production Ready Checklist
- [ ] Shopify Partner Account & App Created
- [ ] `read_products`, `write_draft_orders`, `read_customers` Scopes Approved
- [ ] Gemini API Key with Search Grounding Access
- [ ] Vector Database (Supabase `pgvector`) for Visual Search
- [ ] Stripe Connect / Shopify Payments B2B Configuration

---

## 🗺️ 2. System Architecture (Mermaid)

### High-Level Data Flow

```mermaid
graph TD
    subgraph "FashionOS App (The Brain)"
        UI[React Frontend]
        AI[Gemini 3 Pro Engine]
        DB[Supabase (Profiles, Relationships)]
        Match[Matching Engine]
    end

    subgraph "Shopify Platform (The Engine)"
        S_Prod[Products & Inventory]
        S_Cust[B2B Companies (Buyers)]
        S_Order[Draft Orders / Invoices]
        S_Price[Price Lists / Catalogs]
    end

    subgraph "Users"
        Brand[Fashion Brand (Designer)]
        Retail[Retail Buyer]
    end

    Brand -->|Syncs Products| S_Prod
    S_Prod -->|Webhooks| DB
    
    Retail -->|Applies| UI
    UI -->|Vetting Request| AI
    AI -->|Grounding Check| Web[Google Search]
    AI -->|Risk Score| DB
    
    Retail -->|Browses| UI
    UI -->|Visual Match| Match
    Match -->|Vision Analysis| AI
    
    Retail -->|Create Order| UI
    UI -->|Write Order| S_Order
    S_Order -->|Invoice| Retail
```

---

## 📝 3. Marketplace Definition

**What it IS:**
A curated, data-driven wholesale operating system. It connects verified independent fashion brands with vetted multi-brand retailers. It utilizes **Shopify B2B** for the transactional layer (inventory, payments, tax) and **FashionOS** for the relational layer (discovery, showroom experience, trust).

**What it is NOT:**
*   It is NOT a consumer marketplace (No "Add to Cart" for single items).
*   It is NOT a dropshipping platform.
*   It is NOT an open bazaar (Gatekeepers exist on both sides).

**Core Value:**
*   **For Designers:** "Find me retailers who actually pay and fit my aesthetic."
*   **For Buyers:** "Help me discover the next breakout brand before my competitors do, with Net-60 terms."

---

## 👥 4. User Roles & Logic

| Role | Actions | Verification Logic |
| :--- | :--- | :--- |
| **Designer (Brand)** | Sync Shopify store, Set Wholesale Pricing, Approve Buyers, Ship Orders. | **Manual + AI:** Social audit, revenue estimation via Code Execution. |
| **Retail Buyer** | Apply for access, Browse Showrooms, Create Draft Orders, Request Net Terms. | **AI Heavy:** Location verification (Maps), URL Context analysis of their existing e-com. |
| **Admin** | Resolve disputes, Curate homepage, Manage AI thresholds. | Root access. |

---

## 🏗️ 5. Feature Architecture & Tool Usage

This section delineates what we build in **FashionOS** vs what we leverage in **Shopify**.

### A) Smart Buyer Vetting (The Gatekeeper)
*   **Where:** FashionOS App
*   **Purpose:** Prevent fraud and ensure brand alignment.
*   **Gemini Tool:** `Google Search Grounding` + `URL Context Tool`.
*   **Logic:**
    1.  Buyer submits URL (`boutique.com`) and Instagram.
    2.  Gemini browses the URL to extract brands carried (e.g., "Carries Ganni, Stine Goya").
    3.  Gemini searches Google Maps for the physical store address to verify existence and neighborhood quality.
    4.  **Output:** A "Fit Score" (0-100).

### B) The Digital Showroom (Image-First)
*   **Where:** FashionOS App
*   **Purpose:** Elevate the buying experience beyond a spreadsheet.
*   **Gemini Tool:** `Multimodal Vision` + `Structured Outputs`.
*   **Logic:**
    1.  Designer uploads Lookbook PDF or Images.
    2.  Gemini Vision analyzes images to tag attributes (e.g., "Silhouette: Oversized", "Fabric: Silk", "Mood: Dark Academia").
    3.  Tags are stored in Supabase for search filtering.

### C) Wholesale Ordering (The Transaction)
*   **Where:** FashionOS UI -> Shopify Backend
*   **Purpose:** Handle complex B2B logic (Case packs, Pre-orders).
*   **Gemini Tool:** `Code Execution`.
*   **Logic:**
    1.  Buyer builds a cart.
    2.  Gemini Code Execution validates constraints: "Does Line Item A meet the pre-order window? Is Total > $2,000 MOQ?"
    3.  If valid, App calls Shopify Admin API to create a `DraftOrder`.

### D) Pricing & Net Terms
*   **Where:** Shopify B2B (Price Lists)
*   **Purpose:** Show different prices to different buyers.
*   **Logic:**
    *   FashionOS maps "Tier 1 Retailers" to Shopify Price List A (50% off retail).
    *   FashionOS maps "Distributors" to Shopify Price List B (60% off retail).

---

## 🤖 6. Gemini 3 Pro Integration (Deep Dive)

### Feature: The "Risk Analyst" (Buyer Onboarding)
**Trigger:** Buyer submits registration form.
**Tools:** `Thinking Mode`, `Google Search`, `URL Context`.

**Prompt Strategy:**
> "Analyze this retailer application.
> 1. Use **Google Search** to verify if 'Store Name' exists at 'Address'. Look for recent reviews or news.
> 2. Use **URL Context** on 'website.com'. List the top 3 luxury brands they currently stock.
> 3. Use **Thinking Mode** to determine if their aesthetic matches our 'Contemporary Luxury' category.
> 4. **Reasoning:** If they sell fast fashion, flag as 'Low Match'. If they sell high-end peers, flag as 'High Match'.
> 5. Output JSON: { risk_score, aesthetic_match, brands_stocked, verdict }."

### Feature: The "Merchandising Assistant" (Reordering)
**Trigger:** Buyer views a brand they've bought before.
**Tools:** `Code Execution`, `Structured Outputs`.

**Prompt Strategy:**
> "Analyze previous order history (JSON provided).
> 1. Use **Code Execution** to calculate sell-through velocity (simulated based on reorder dates).
> 2. Identify top-performing categories (e.g., 'Knitwear').
> 3. Recommend 3 new items from the current collection that match the attributes of previous best-sellers.
> 4. Output JSON: { recommended_product_ids, reasoning_text }."

---

## 📋 7. Structured Output Schemas

### A) Buyer Vetting Schema
*Target: Database `buyer_applications` table.*

```json
{
  "type": "object",
  "properties": {
    "application_id": { "type": "string" },
    "verification": {
      "type": "object",
      "properties": {
        "is_physical_store": { "type": "boolean" },
        "google_maps_rating": { "type": "number" },
        "brands_carried": { "type": "array", "items": { "type": "string" } },
        "price_point": { "type": "string", "enum": ["Discount", "Mass", "Contemporary", "Luxury"] }
      }
    },
    "risk_analysis": {
      "type": "object",
      "properties": {
        "score": { "type": "integer", "description": "0-100, where 100 is safe" },
        "red_flags": { "type": "array", "items": { "type": "string" } },
        "ai_verdict": { "type": "string", "enum": ["Auto-Approve", "Manual Review", "Reject"] }
      }
    }
  }
}
```

### B) Wholesale Order Validation Schema
*Target: Frontend Validation before Shopify Sync.*

```json
{
  "type": "object",
  "properties": {
    "is_valid": { "type": "boolean" },
    "violations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "sku": { "type": "string" },
          "issue": { "type": "string", "enum": ["MOQ_Unmet", "Pack_Broken", "Preorder_Closed"] },
          "message": { "type": "string" },
          "suggested_fix": { "type": "integer", "description": "New quantity to add" }
        }
      }
    },
    "cart_total": { "type": "number" },
    "currency": { "type": "string" }
  }
}
```

---

## 🔄 8. End-to-End Workflow: The "Smart Order"

**Scenario:** A Boutique Buyer places a wholesale order.

1.  **Browser:** Buyer adds 15 items to cart.
2.  **FashionOS App:**
    *   Triggers `Gemini Code Execution` to validate logic:
        *   *Rule:* "Dresses must be bought in size runs (1xS, 2xM, 2xL, 1xXL)."
        *   *Code:* Checks cart counts. Returns valid/invalid.
3.  **Validation:** Gemini returns `is_valid: false` with `suggested_fix: "Add 1 Medium to complete the pack."`
4.  **UI:** User accepts fix. Cart updates.
5.  **Submission:** User clicks "Submit PO".
6.  **Backend:**
    *   FashionOS creates `DraftOrder` in Shopify via API.
    *   Tags order `channel:fashionos`.
    *   Sets payment terms `Net 60` (based on buyer profile).
7.  **Shopify:**
    *   Reserves inventory.
    *   Emails invoice to Buyer.
8.  **Completion:** Designer logs into Shopify, sees order, clicks "Approve & Ship".

---

## 🚫 9. What NOT To Build (Critical)

1.  **Do NOT build a proprietary billing engine.**
    *   *Why:* Handling taxes (VAT/GST), cross-border duties, and dunning is a nightmare. Use Shopify Markets and Shopify Payments. They handle the compliance.

2.  **Do NOT build "Instant Checkout".**
    *   *Why:* B2B is negotiation. Shipping is rarely calculated instantly (freight). Orders should effectively be "Requests for Invoice" (Draft Orders).

3.  **Do NOT sync inventory in real-time via polling.**
    *   *Why:* It hits API limits. Use Shopify Webhooks (`inventory_levels/update`) to listen for changes and update Supabase lazily.

---

## 📈 10. Success Metrics

| Metric | Target | Why it matters |
| :--- | :--- | :--- |
| **GMV (Gross Merchandise Value)** | $1M/mo | Vanity metric, but shows scale. |
| **Buyer Repeat Rate** | > 40% | **The North Star.** If buyers don't come back, the curation is bad. |
| **Order Rejection Rate** | < 5% | Means the AI vetting and matching is working (Designers trust the buyers). |
| **Time-to-Invoice** | < 4 hours | Efficiency. How fast does a Draft Order become a paid Invoice? |

---

## 🏁 11. System Summary

FashionOS transforms Shopify from a B2C storefront into a B2B network.

*   **Architecture:** Headless B2B. React Frontend for experience, Shopify Backend for ledger.
*   **AI Role:** The "Digital Merchandiser." It vets buyers, enforces logic, and curates products, replacing the need for a massive sales team.
*   **Scalability:** By leveraging Shopify for the heavy lifting (payments/inventory), FashionOS remains lightweight and focused on **data intelligence** and **user experience**.