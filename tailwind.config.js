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
        display: ['Bebas Neue', 'cursive'],
      },
      animation: {
        kenburns: 'kenburns 20s ease-out infinite',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)', },
          '50%': { transform: 'scale(1.1) translate(5px, -5px)', },
          '100%': { transform: 'scale(1) translate(0, 0)', },
        }
      }
    },
  },
  plugins: [],
}