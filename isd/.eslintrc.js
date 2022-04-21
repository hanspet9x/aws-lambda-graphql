module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'google',
  ],
  rules: {
    'no-console': 'warn',
    'linebreak-style': 'off',
    'new-cap': 'off',
    'require-jsdoc': 'off',
    'max-len': ['error', {code: 100}],
  },
};
