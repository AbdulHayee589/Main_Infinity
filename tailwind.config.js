/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      screens: {
        xs: "425px",
      },
      colors: {
        black: {
          light: "#1E2329",
          main: "#181a20",
          dark: "#0C0E11",
        },
        gold: {
          light: "#FCD535",
          main: "#F2BC07",
          dark: "#F0B90B",
        },
      }
    },
  },
  plugins: [],
}
