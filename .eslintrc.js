module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // "prettier/prettier": "error",
    "react/no-deprecated": 0,
    "react/jsx-no-target-blank": 0,
    "indent": [2, 4], // 使用tab
    "import/prefer-default-export": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "no-console": 1,
    "arrow-parens": 0,
    "object-curly-newline": 0,
    "react/prop-types": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-indent": 0,
    "react/jsx-indent-props": 0,
    "react/button-has-type": 0,
    "react/jsx-closing-bracket-location": 0,
    "no-use-before-define": 0,
    "react/sort-comp": 0,
    "no-param-reassign": 0,
    "react/no-access-state-in-setstate": 0,
    "no-restricted-syntax": 0,
    "max-len": 0,
    "react/no-array-index-key": 0,
    "no-plusplus": 0,
    "no-unused-expressions": 0,
    "import/no-extraneous-dependencies": 0,
    "global-require": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-shadow": 0,
    "no-await-in-loop": 0,
    "class-methods-use-this": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "import/extensions": 0,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/semi": ["error"],
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "import/no-absolute-path": 0,
    '@typescript-eslint/semi': 0,
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'react/jsx-one-expression-per-line': 0,
  },
  settings: {
    "import/resolver": {
      "webpack": {
        "config": "webpack.config.js",
      },
    }
  },
  globals: {
    describe: true,
    it: true,
    expect: true,
    beforeAll: true,
    afterAll: true
  }
};
