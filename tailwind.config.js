/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        // Luxury Neutral Palette
        'soft-cream': '#F7F3EF',
        'rich-black': '#0A0A0A',
        'charcoal': '#373737',
        'warm-beige': '#E8DED4',
        'gold-accent': '#C8A96A',
        'off-white': '#FCFBFA',
      }
    },
  },
  plugins: [],
}