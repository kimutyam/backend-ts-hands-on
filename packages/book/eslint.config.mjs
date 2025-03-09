import { FlatCompat } from '@eslint/eslintrc';
import baseConfig from '../../eslint.config.mjs';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import stylisticJs from '@stylistic/eslint-plugin-js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const compat = new FlatCompat();

export default [
  ...baseConfig,
  {
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
      '@stylistic/js': stylisticJs,
      'simple-import-sort': simpleImportSort,
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
      '@typescript-eslint/method-signature-style': [
        'error',
        'property',
      ],
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
      'simple-import-sort/exports': 'error',
    },
  },
];
