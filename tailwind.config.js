/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['SegoeUI','Lato','Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundColor:{
        '272727': ' #272727',
      }
    },
  },
  plugins: [],
}

