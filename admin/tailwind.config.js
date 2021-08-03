module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        gilroy: ["Gilroy"],
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#F8F8FB",
      secondary: "#EFF3FA",
      white: "#FFFFFF",
      main: "#4ABEC6",
      lightblue: "#8CD5FF",
      lightred: "#F69A9A",
      orange: {
        100: "#FB602F",
        200: "#F8A92A",
      },
      green: {
        100: "#42DD94",
        200: "#63C9A8",
      },
      yellow: {
        100: "#FBDD8C",
        200: "#FAD151",
      },
      violet: {
        100: "#5243C2",
        200: "#CFA2FF",
      },
      fonts: {
        100: "#223141",
        200: "#DBDBDB",
        300: "#000000",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"), // import tailwind forms
  ],
};
