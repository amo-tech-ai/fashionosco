# Changelog

## [2.5.0] - 2025-05-29
### The "Intelligence Surge" Update
- **Feature**: **Live Production Desk** - A mission-control interface for on-set execution with live cues for Audio, Lighting, and Stage management.
- **AI Agent**: **The Showrunner** - Predictive mitigation agent that monitors set velocity and atmospheric risk (weather) to suggest schedule pivots.
- **Feature**: **AI Video Engine (Veo 3.1)** - Integrated Veo 3.1 Fast for cinematic teaser generation directly from the Event Timeline.
- **Feature**: **Visual Venue Twin (Imagen 4.0)** - High-fidelity architectural interior rendering using brand color palettes.
- **Architecture**: Enforced Vite Sovereignty by removing legacy browser importmaps.
- **Intelligence**: Integrated **Omni-Concierge** assistant into every page for tactical navigation and strategic advice.

## [2.2.0] - 2025-05-28
### Production Finalization
- **Refactoring**: Migrated `RetailerCRM` and `PaymentService` to robust Service-based architecture with Supabase integration and offline fallbacks.
- **Security**: Hardened logic for API usage; verified environment variable handling in `src/lib/supabase.ts`.
- **Validation**: Completed end-to-end testing of all user journeys.
- **Documentation**: Updated all architecture docs to reflect the "Hybrid OS" state.

## [2.1.0] - 2025-05-27
### Brand Designer Onboarding
- **New Feature**: "Digital Twin" Setup Wizard (`/create-profile`) for fashion brands.
- **AI Agent**: Deployed `audit-brand` Edge Function using Gemini 3 Pro with Google Search Grounding.
- **Scoring Engine**: Implemented `BrandAuditResult` logic to calculate Brand Health.
