/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0F172A',        // background dark
        light: '#F8FAFC',       // background light
        'text-dark': '#E2E8F0', // text on dark bg
        'text-light': '#1E293B',// text on light bg
        brand: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          500: '#22C55E', // main green
          600: '#16A34A',
          700: '#15803D',
        },
        accent: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        md: '0.5rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        default: '0 4px 12px rgba(0,0,0,0.1)',
        strong: '0 8px 24px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};
