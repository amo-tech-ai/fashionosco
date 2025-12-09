# FashionOS Project Sitemap & Setup Examination

## URL Routing Structure
Defined in `Router.tsx`, using `HashRouter` (via `App.tsx`).

| URL Path | Component | Layout | Description |
|----------|-----------|--------|-------------|
| `/` | `Home` | `Layout` | Main landing page with editorial design, hero, and feature blocks. |
| `/services` | `Services` | `Layout` | Overview of all 6 service categories, workflow, and portfolio. |
| `/services/product-photography` | `ProductPhotography` | `Layout` | Detailed landing page specifically for product photography services. |
| `/dashboard` | `Dashboard` | `DashboardLayout` | User area overview (requires login concept). |
| `*` | `NotFound` | N/A | 404 Error page fallback. |

## File System Structure

### Root Configuration
- `index.html`: Main entry point. Loads Tailwind CDN and fonts (Playfair Display, Inter).
- `index.tsx`: React application entry point. Mounts `App` to `#root`.
- `App.tsx`: Wraps application in `HashRouter` and `ScrollToTop` handler.
- `Router.tsx`: Defines the `Routes` configuration.
- `types.ts`: Shared TypeScript interfaces (`NavItem`, `ButtonVariant`).
- `metadata.json`: App metadata (name, permissions).
- `vite.config.ts`: Vite build configuration with alias setup.
- `tailwind.config.js`: Tailwind theme customization (colors, fonts).

### Directories

#### `/layouts`
- `Layout.tsx`: The primary public-facing layout. Contains the Sticky Header (Logo, Nav, Mobile Menu) and Editorial Footer.
- `DashboardLayout.tsx`: Admin/User layout with a sidebar navigation structure.

#### `/pages`
- `Home.tsx`: Complex landing page with multiple sections (Hero, Campaigns, User Journey, AI Services).
- `Services.tsx`: Detailed services overview with category grids and process flows.
- `ProductPhotography.tsx`: Specialist service page with masonry grids and specific value propositions.
- `Dashboard.tsx`: Simple dashboard view with stats placeholders.
- `NotFound.tsx`: Standard 404 view.

#### `/components`
- `Button.tsx`: Reusable button component with variants (Primary, Secondary, Ghost, Danger) and loading states.
- `ScrollToTop.tsx`: Utility to reset scroll position on route change.

#### `/docs`
- `changelog.md`: Record of project updates.
- `troubleshooting.md`: Common issues and fixes.
- `progress_tracker.md`: Project status checklist.
- `01-homepage-plan.md`: Specification for homepage design.
- `sitemap.md`: (This file) Overview of project structure.

## Technical Setup Notes
- **Styling**: Tailwind CSS (Runtime CDN for preview, config file for structure).
- **Icons**: `lucide-react` for UI icons.
- **Navigation**: `react-router-dom` (v6+) using `HashRouter` for static host compatibility.
- **Fonts**: Google Fonts via CDN (Inter for UI, Playfair Display for Headings).
