
# Changelog

## [2.2.0] - 2025-05-28
### Production Finalization
- **Refactoring**: Migrated `RetailerCRM` and `PaymentService` to robust Service-based architecture with Supabase integration and offline fallbacks.
- **Security**: Hardened logic for API usage; verified environment variable handling in `src/lib/supabase.ts`.
- **Validation**: Completed end-to-end testing of all user journeys:
  - Guest -> Brand Onboarding -> Dashboard
  - Producer -> Shoot Wizard -> Payment -> Shot List
  - Retailer -> Application -> Vetting -> Showroom Order
- **Documentation**: Updated all architecture docs to reflect the "Hybrid OS" state.

## [2.1.0] - 2025-05-27
### Brand Designer Onboarding
- **New Feature**: "Digital Twin" Setup Wizard (`/create-profile`) for fashion brands.
- **AI Agent**: Deployed `audit-brand` Edge Function using Gemini 3 Pro with Google Search Grounding to perform deep market research on brand URLs.
- **Scoring Engine**: Implemented `BrandAuditResult` logic to calculate Brand Health and Content Consistency scores.
- **Reporting**: Added PDF Export functionality for Brand Audits.
- **UX Improvements**:
  - Added retry logic for AI analysis steps.
  - Implemented input validation for URLs.
  - Added "Brand Health" widget to the main Dashboard.

## [2.0.0] - 2025-05-26
### Full Stack Integration & Launch Readiness
- **Backend Architecture**: Fully migrated from local storage prototypes to Supabase (PostgreSQL + Edge Functions).
- **Active Campaign System**: Implemented `ActiveCampaignContext` to sync Dashboard, Shot List, and Gallery views to the selected project in the database.
- **Realtime Collaboration**: Enabled Supabase Realtime subscriptions for campaign updates.
- **Event Management**: Launched `EventWizard` and `EventReviewStep` with DB persistence for booking runway shows/parties.
- **Asset Pipeline**:
  - Added Drag-and-Drop upload for Client Gallery.
  - Implemented commenting and status tagging (Select/Reject) stored in DB.
- **Directory**: Connected Talent Directory to live `stakeholders` table.
- **PDF Generation**: Robust Call Sheet generator now handles both "Draft" (Wizard) and "Active" (Dashboard) data structures.

## [1.5.0] - 2025-05-25
### Production Readiness & Integration
- **Dashboard Integration**: Added "Book a Shoot" direct link to the Dashboard sidebar, seamlessly connecting the user workspace with the booking wizard.
- **Workflow Persistence**: Implemented local storage saving for AI-generated shot lists, allowing users to import drafts directly into the Shot List management tool.
- **AI UI Enhancements**: 
  - Added "Onboarding Overlay" to introduce new users to AI features.
  - Refined "Vision Analysis" UI with clickable brand links and clear palette displays.
  - Added "Shot List" editing and priority cycling.
- **Pricing Engine**: Completed dynamic pricing logic including add-ons (Video, Stylist) and turnaround time multipliers (Rush/Extended).
