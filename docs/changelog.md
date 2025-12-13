
# Changelog

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

## [1.4.0] - 2025-05-24
### AI Integration (Gemini 3 Pro)
- **Shoot Wizard AI**: Implemented `gemini-3-pro-preview` for intelligent production planning.
- **Vision Analysis**: Added `CreativeDirectionStep` which analyzes uploaded moodboards to extract color palettes, lighting styles, and brand references using Gemini Vision + Google Search Grounding.
- **Shot List Builder**: Added `DeliverablesStep` which uses Gemini Thinking Config to reason about creative direction and generate structured, prioritized shot lists.
- **Robust Fallbacks**: Implemented high-fidelity "Demo Mode" in frontend services to ensure wizard functionality even without a live Supabase backend connection.

## [1.3.0] - 2025-05-23
### New Features
- **Instagram Services Page**: Launched `/services/instagram`, a premium editorial page for social media content.
  - Features high-performance scroll animations, parallax hero, and vertical video spotlight sections.
  - Implemented glassmorphism UI and count-up stats.
- **Global Animation System**: Consolidated animation styles into `index.html`.
  - Added `.reveal-on-scroll` utility class for standardized 0.8s cubic-bezier entrances.
  - Added `@keyframes moveUp` for infinite scroll simulations.

### Enhancements
- **Performance**: 
  - Refactored `InstagramHero` and `ClothingHero` to use `requestAnimationFrame` with Linear Interpolation (Lerp) for smoother, decoupled parallax effects.
  - Optimized `InstagramVideo` scroll detection to prevent main-thread blocking.
- **Codebase Cleanliness**: Removed redundant `<style>` blocks from individual page components.

## [1.2.0] - 2025-05-22
### Production Polish
- **Dashboard Redesign**: Upgraded `pages/Dashboard.tsx` from generic layout to a premium, on-brand interface using Serif fonts and clean spacing.
- **Product Photography Navigation**: Fixed the "Request a Quote" anchor link in `pages/ProductPhotography.tsx` to use smooth scrolling, eliminating page reloads.
- **Mobile Navigation Refinement**: Enhanced `layouts/Layout.tsx` mobile menu with clearer hierarchy, "Book a Shoot" CTA, and active state indicators for sub-services.
- **Service Linking**: Updated `pages/Services.tsx` category cards to link directly to the newly implemented specific service pages (Clothing, Ecommerce, Creative Still Life).

## [1.1.0] - 2025-05-21
### Major Updates
- **Services Page Redesign**: Complete overhaul of `pages/Services.tsx` to align with the 6-category Premium Editorial Specification.
  - Categories: Web Design, Photography, Video Production, E-Commerce, Social Media, AI Creative.
  - Implemented alternating "mini-landing page" blocks for each category.
  - Added new "Future Tech" AI Tools showcase.
  - Updated "Workflow" to a clean 5-step process (Explore -> Book -> Plan -> Create -> Deliver).
  - Enhanced Portfolio Masonry with new filters.
- **Navigation Update**: Updated Footer in `layouts/Layout.tsx` to match the exact 6 service categories.

## [1.0.1] - 2025-05-20
### Added
- **Premium Services Page**: Completely redesigned `pages/Services.tsx` to match editorial specifications.
  - Added "Services Category Grid" with icons.
  - Added "Detailed Service Sections" with alternating layouts.
  - Added "Workflow" timeline visualization.
  - Added "Portfolio Masonry" grid with filtering.
  - Added "Pricing Table" and "AI Tools" block.
- **Mobile Navigation**: Implemented functional mobile menu in `layouts/Layout.tsx` using `useState`.
- **Documentation**: Created `docs/` folder with changelog, troubleshooting, and progress tracking.

## [1.0.0] - 2025-05-19
### Initial Release
- Basic project structure setup with React, Vite, Tailwind.
- Created Home, Services (placeholder), Dashboard, and NotFound pages.
- Implemented Editorial Home Page design.
- Configured Routing and Layouts.
