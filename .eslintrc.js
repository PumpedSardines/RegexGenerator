module.exports = {
  env: {
    browser: true,
    es6: true,
    node: false,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["*.js"],
  plugins: ["@typescript-eslint", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  rules: {
    eqeqeq: 2,
    "require-await": 2,
    "no-invalid-regexp": 2,
    semi: 2,
    "require-await": 2,
    "no-non-null-assertion": 0,
  },
};
