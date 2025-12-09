
# Troubleshooting Guide

## Common Issues

### 1. Styles not applying
**Symptom:** Elements look unstyled or Tailwind classes aren't working.
**Solution:**
- Ensure `tailwind.config.js` content paths are correct: `content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"]`.
- Check if the Tailwind CDN script is present in `index.html` (for this runtime environment).

### 2. Routing 404s on Refresh
**Symptom:** Refreshing a sub-route (e.g., `/dashboard`) results in a 404 error.
**Solution:**
- The app uses `HashRouter` in `App.tsx` specifically to handle static hosting/preview environments where history API fallback isn't configured. Ensure you are accessing routes via `/#/route` (though the router handles this automatically).

### 3. Missing Images
**Symptom:** Images from Unsplash are broken.
**Solution:**
- Check internet connection (images are remote).
- Unsplash URLs might expire or change; replace `src` attributes with valid URLs if necessary.

### 4. Mobile Menu Not Opening
**Symptom:** Clicking the hamburger icon does nothing.
**Solution:**
- Ensure `Layout.tsx` has been updated with the `useState` logic for `isMobileMenuOpen`. (Fixed in v1.0.1).

### 5. Parallax or Scroll Animation Jitter
**Symptom:** Hero sections or scroll-reveal elements feel laggy.
**Solution:**
- The app uses `requestAnimationFrame` for parallax. Ensure you are not running CPU-intensive tasks on the main thread.
- If elements pop in without animation, check if `index.html` contains the `.reveal-on-scroll` CSS class definition.
- Verify `IntersectionObserver` is supported in the browser (standard in modern browsers).

### 6. App Failed to Load (Blank Screen)
**Symptom:** White screen on startup.
**Solution:**
- Check console for "Module not found" errors. This usually means a file path in an `import` statement is incorrect.
- Ensure all new components (e.g., `InstagramHero`) are exported as named exports: `export const InstagramHero` and imported with curly braces: `import { InstagramHero }`.
- Verify `Router.tsx` includes all necessary imports for the defined routes.