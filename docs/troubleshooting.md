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
