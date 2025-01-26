import { FlatCompat } from '@eslint/eslintrc';
import baseConfig from '../../eslint.config.mjs';

const compat = new FlatCompat();

export default [
  ...baseConfig,
  {
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
    },
  },
];
