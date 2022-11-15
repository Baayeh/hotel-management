/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#228B22",
        primaryColorLight: "#50C878",
        primaryColorDark: "#00674b",
        greyBaseColor: "#e9eaf3",
      },
    },
  },
  plugins: [],
};
