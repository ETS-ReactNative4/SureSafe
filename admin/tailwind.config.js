module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        gilroy: ["Gilroy"],
      },
    },
    // height: () => ({
    //   "900px": "900px",
    //   "800px": "800px",
    //   "500px": "500px",
    //   "480px": "480px",
    //   "400px": "400px",
    //   "300px": "300px",
    //   "200px": "200px",
    // }),
    screens: {
      phone: "0px",
      tablet: "800px",
      laptop: "1500px",
      desktop: "1880px",
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
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/forms"), // import tailwind forms
  ],
};
