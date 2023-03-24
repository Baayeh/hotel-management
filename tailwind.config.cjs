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
      dropShadow: {
        customShadow: "0 1.5rem 4rem rgba(22, 28, 45, 0.1)",
      },
      backgroundImage: {
        'room-banner': "url('https://res.cloudinary.com/dskl0qde4/image/upload/v1678996996/room-banner_pk9xu4.jpg')"
      },
    },
  },
  plugins: [],
};
