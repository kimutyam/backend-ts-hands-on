import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import typeScriptESLint from '@typescript-eslint/eslint-plugin';
import typeScriptESLintParser from '@typescript-eslint/parser';
import { fixupConfigRules } from '@eslint/compat';

const compat = new FlatCompat();

export default [
  {
    ignores: ['**/*.js'],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...fixupConfigRules(
    compat.extends(
      'airbnb-base',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'prettier',
    ),
  ),
  ...compat.env({
    node: true,
    jest: true,
  }),
  {
    plugins: {
      typeScriptESLint,
    },
    languageOptions: {
      parser: typeScriptESLintParser,
      parserOptions: {
        project: true,
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
          readonly: 'generic',
        },
      ],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        {
          fixMixedExportsWithInlineTypeSpecifier: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreIIFE: true,
        },
      ],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-namespace': 'off',
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',
      'import/export': 'off',
      'import/extensions': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          pathGroups: [
            {
              pattern: '@libs/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      'class-methods-use-this': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/test/**', '**/__tests__/**'],
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      // SEE: https://github.com/iamturns/eslint-config-airbnb-typescript/blob/91fd090f6fdd8d598a6ac6e9bb2c2ba33014e425/lib/shared.js#L84-L87
      'dot-notation': 'off',
    },
  },
];
