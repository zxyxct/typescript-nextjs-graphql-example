module.exports = {
  extends: [
    "eslint:recommended",
    "next",
    "next/core-web-vitals",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["react", "import", "react-hooks", "testing-library"],
};
