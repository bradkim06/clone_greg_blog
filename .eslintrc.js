module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    project: ['./tsconfig.json'],
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
