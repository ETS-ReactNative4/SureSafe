module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      // caption uses the systemfont so it looks more native
      display: ["caption"],
      body: ["Gilroy"],
    },
    extend: {
      colors: {
        primary: {
          100: "#91C4D7",
          200: "#65ACC8",
          300: "#4FA0C0",
          400: "#4091B1",
          500: "#387F9B",
          600: "#306D85",
          700: "#285B6F",
          800: "#204959",
          900: "#183642",
        },
        whites: {
          100: "#F8F8FB",
          200: "#EFF3FA",
          300: "#FFFFFF",
        },
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
        red: {
          100: "#F69A9A",
        },
        main: "#4ABEC6",
        blue: {
          100: "#8CD5FF",
        },
        fonts: {
          100: "#223141",
          200: "#DBDBDB",
          300: "#000000",
        },
      },
    },
  },
  variants: {
    outline: ["focus", "hover"],
    border: ["focus", "hover"],
  },
  plugins: [],
};
