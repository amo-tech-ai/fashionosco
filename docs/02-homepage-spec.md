
# 💎 FashionOS Homepage Specification: "The Vogue of Software"

**Status:** Live Implementation
**Framework:** React 19 + Vite + Tailwind CSS
**Theme:** Ultra-Premium / Editorial / Minimalist

---

## 1. Design Philosophy

**Visual Language:**
- **"Digital Gloss":** The interface should feel like flipping through a high-end fashion magazine (Vogue, Harper's Bazaar) but interactive.
- **Whitespace as Luxury:** Heavy use of negative space to allow imagery to breathe.
- **Typography:** Strict hierarchy.
  - **Headings:** `Playfair Display` (Serif) for emotional, editorial impact.
  - **Body/UI:** `Inter` (Sans) for readability and utilitarian controls.
- **Texture:** Subtle film grain overlays (`opacity-[0.03]`) and abstract organic shapes to break the digital sharpness.

**Color Palette:**
- **Primary:** `Rich Black (#0A0A0A)` - Used for text and primary actions.
- **Backgrounds:** `Soft Cream (#F7F3EF)` & `Off White (#FCFBFA)` - Warmer than sterile white.
- **Accents:** `Gold Accent (#C8A96A)` - Used sparingly for lines and highlights.
- **Gradients:** Subtle `Purple-to-Pink` text gradients to signify AI/Tech features without looking "SaaS-y".

---

## 2. Technical Architecture (Flat Root)

**Rules:**
- **No `src/` directory.** All components live in `components/`, pages in `pages/`.
- **Assets:** Images via Unsplash Source URLs (high fidelity `q=80`) or local assets in `assets/`.
- **Animations:** CSS-based keyframes (`animate-in`, `slide-in-from-bottom`) via Tailwind for performance.
- **State:** Minimal local state for UI interactions (dropdowns, mobile menu).

---

## 3. Section-by-Section Wireframe & Logic

### A. The "Cinematic" Hero
*   **Layout:** Split 50/50 (Text Left / Visual Right).
*   **Background:** `soft-cream` gradient with SVG Noise Filter overlay.
*   **Content:**
    *   *H1:* Massive Serif font ("Exceptional fashion imagery").
    *   *Sub:* "FashionOS Studio" label in uppercase tracking widely.
    *   *Visual:* A 3-image collage (Main, Secondary, Detail) with slight parallax or entry animation delays.

### B. "Latest Campaigns" (The Grid)
*   **Layout:** 3-Column Masonry feel.
*   **Interaction:**
    *   Cards zoom (`scale-110`) on hover.
    *   Text overlay appears on hover with a dark gradient scrim.
    *   Cursor changes to "View" or custom arrow.
*   **Data:** Editorial images (Runway, Lookbook, Streetwear).

### C. "Studio Story" (Trust Builder)
*   **Layout:** Asymmetrical. Large image on Left, Text block on Right.
*   **Component:** Floating "Quote Card" overlapping the image ("A game changer...").
*   **Typography:** High contrast. Large Serif headers.

### D. "Heritage" (Authority)
*   **Visual:** Full-height grayscale image that turns color on hover.
*   **Content:** "20+ Years in Industry". List of prestige clients.
*   **Micro-interaction:** Hovering list items highlights the corresponding capability.

### E. "Services" (Navigation)
*   **Style:** Minimalist Grid.
*   **Icons:** `Lucide-React` icons (Camera, Video, Sparkles) inside clean circles.
*   **Behavior:** Entire card is clickable. Subtle shadow lift on hover.

### F. "The Ecosystem" (Process Flow)
*   **Concept:** A visual representation of the workflow (Browse -> Book -> Produce -> Enhance).
*   **Visual:** Glassmorphic cards connected by an animated SVG dashed line.
*   **Animation:** Cards fade in sequentially (`stagger-children`).

### G. "AI Intelligence" (Feature Suite)
*   **Layout:** Bento Grid (2x4 or similar).
*   **Style:** "Tech-Luxe". White cards with subtle purple glow borders.
*   **Content:** "Photo Enhancer", "Caption Gen", "Storyboard".

### H. "Behind The Scenes" (Immersion)
*   **Visual:** Full-width parallax video background or high-res image.
*   **Overlay:** "Watch Studio Tour" button (Play icon).
*   **Vibe:** Raw, authentic energy vs. the polished front-end.

---

## 4. UI/UX Behaviors & Best Practices

1.  **Scroll Reveal:**
    *   Use `IntersectionObserver` to trigger `.is-visible` classes.
    *   Elements should slide up (`translateY`) and fade in.

2.  **Navigation:**
    *   **Desktop:** Sticky header with `backdrop-blur`. Mega-menu for "Services".
    *   **Mobile:** Full-screen slide-down menu with large typography.

3.  **Buttons:**
    *   **Primary:** Solid Black, White Text, Sharp corners (0.25rem radius). Uppercase.
    *   **Secondary:** White, Black Border.
    *   **Ghost:** Text with underline hover effect.

4.  **Images:**
    *   Always use `object-cover`.
    *   Aspect ratios: Portrait (`3/4`) for fashion, Square (`1/1`) for products, Landscape (`16/9`) for video.

---

## 5. Prompt for AI Generation

To generate/update this page, use:

> "Act as a Senior Frontend Engineer and UI Designer. Update the `Home.tsx` component.
> Implement a luxury fashion landing page using Tailwind CSS.
> Use `Playfair Display` for headings and `Inter` for body text.
> The layout must use a 'Flat Root' structure (no src folder).
>
> **Key Sections to Build:**
> 1.  **Hero:** Split screen with film grain texture and animated entry.
> 2.  **Campaigns:** A 3-column grid of vertical images with hover-zoom effects.
> 3.  **Services:** Clean grid with Lucide icons.
> 4.  **AI Suite:** A bento-grid style section highlighting tech features.
>
> **Aesthetic Requirements:**
> - Use a neutral palette: #F7F3EF (Cream), #0A0A0A (Black).
> - Add subtle scroll-triggered animations (fade-up).
> - Ensure mobile responsiveness (stack grids on mobile).
> - Use high-quality Unsplash fashion images for placeholders."
