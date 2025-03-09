import { FlatCompat } from '@eslint/eslintrc';
import baseConfig from '../../eslint.config.mjs';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import stylisticJs from '@stylistic/eslint-plugin-js';

const compat = new FlatCompat();

export default [
  ...baseConfig,
  {
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
      '@stylistic/js': stylisticJs,
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
      'max-len': [
        'error',
        {
          code: 80,
          tabWidth: 2,
          comments: 92,
          ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
        },
      ],
    },
  },
];
