module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  rules: {
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
  }
};
