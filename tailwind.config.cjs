/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    minHeight: {
      4: '4rem',
      10: '10rem',
      8: '8rem'
    },
    extend: {

    },
  },
  plugins: [],
}
