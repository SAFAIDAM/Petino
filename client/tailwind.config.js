/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      ' cursive ' : ["Gluten"]
    },
    extend: {},
    screens: {
      'sm': '450px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1220px',

      '2xl': '1536px',
    }
  },
  plugins: [],
}
