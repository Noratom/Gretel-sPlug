/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFFFF',
          100: '#FDFBF7',
          200: '#F7F3EB',
          300: '#EFE8DA',
          400: '#E4DA8',
        },
        gold: {
          light: '#E6CA85',
          DEFAULT: '#C5A059',
          dark: '#A37E36',
          bright: '#D4AF37',
        },
        charcoal: {
          light: '#333333',
          DEFAULT: '#1A1A1A',
          dark: '#0F0F0F',
        },
        silk: {
          cream: '#F9F6F0',
          taupe: '#E8E2D5',
          nude: '#DFD5C6',
          warm: '#8C8275',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
