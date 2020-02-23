module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    "prettier/prettier": "error",
    "react/no-deprecated": 0,
    "react/jsx-no-target-blank": 0,
    "indent": [2, 4], // 使用tab
    "import/prefer-default-export": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "no-console": 1
  },
};
