module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "eslint:recommended"],
  overrides: [
    {
      env: {
        node: true,
        jest: true,
        browser: true,
        es6: true,
      },
      files: [".eslintrc.{js,cjs}", "**/*.test.js", "**/*.test.jsx"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "react/react-in-jsx-scope": 0,
    "no-param-reassign": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "no-return-await": 0,
    "no-promise-executor-return": 0,
    "comma-dangle": 0,
    "react/jsx-one-expression-per-line": 1,
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    quotes: ["error", "double"],
    "implicit-arrow-linebreak": 0,
  },
};
