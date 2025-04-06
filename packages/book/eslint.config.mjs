import { FlatCompat } from '@eslint/eslintrc';
import baseConfig from '../../eslint.config.mjs';
import stylisticJs from '@stylistic/eslint-plugin-js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import neverthrow from 'eslint-plugin-neverthrow';

const compat = new FlatCompat();

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        sourceType: 'module',
      },
    },
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
      '@stylistic/js': stylisticJs,
      'simple-import-sort': simpleImportSort,
      '@typescript-eslint': tsPlugin,
      'neverthrow/must-use-result': neverthrow,
    },
    rules: {
      'no-console': 'off',
      'import/order': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          ts: 'never',
          tsx: 'never',
          json: 'never',
        },
      ],
      'func-style': ['error', 'expression'],
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          rootDir: './src',
        },
      ],
      'max-len': [
        'error',
        {
          code: 100,
          tabWidth: 2,
          ignoreComments: false,
          ignoreTrailingComments: false,
          ignoreStrings: false,
          ignoreTemplateLiterals: false,
          ignoreRegExpLiterals: false,
          // ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
        },
      ],
      'simple-import-sort/imports': 'error',
      // 'simple-import-sort/exports': 'error',
      // TODO: 執筆を進めながら徐々に改修する
      // 'no-inline-comments': 'error',
    },
  },
];
