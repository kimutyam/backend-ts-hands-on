module.exports = {
  plugins: ['jest'],
  extends: ['../../.eslintrc.js', 'plugin:jest/recommended', 'plugin:jest/style'],
  rules: {
    'jest/consistent-test-it': ['error', { fn: 'it' }],
  },
};
