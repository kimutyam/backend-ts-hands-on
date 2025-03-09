import { FlatCompat } from '@eslint/eslintrc';
import baseConfig from '../../eslint.config.mjs';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';

const compat = new FlatCompat();

export default [
  ...baseConfig,
  {
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      'no-console': 'off',
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
    },
  },
];
