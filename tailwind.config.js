/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        // Example advanced fonts from Google Fonts
        casino: ['"Cinzel Decorative"', "cursive"],
        body: ['"Open Sans"', "sans-serif"]
      },
      colors: {
        // Stake-like palette
        stakeDark: "#0D0E12",
        stakeGray: "#212429",
        stakeAccent: "#3AC1CE"
      }
    },
  },
  plugins: [],
};
