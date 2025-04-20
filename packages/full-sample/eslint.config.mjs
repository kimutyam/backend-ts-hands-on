import { FlatCompat } from '@eslint/eslintrc';
import baseConfig from '../../eslint.config.mjs';
import JestESLint from 'eslint-plugin-jest';

const compat = new FlatCompat();

export default [
  ...baseConfig,
  ...compat.extends('plugin:jest/recommended', 'plugin:jest/style'),
  {
    plugins: {
      JestESLint,
    },
    rules: {
      'jest/consistent-test-it': ['error', { fn: 'it' }],
      'jest/no-disabled-tests': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
];
