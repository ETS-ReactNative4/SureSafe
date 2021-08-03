const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@suresafe/core": path.resolve(__dirname, "src/core/"),
      "@suresafe/assets": path.resolve(__dirname, "src/assets/"),
      "@suresafe/components": path.resolve(__dirname, "src/components/"),
      "@suresafe/constants": path.resolve(__dirname, "src/constants/"),
    },
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
