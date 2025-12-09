# Changelog

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