import assert from 'node:assert';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import { QuantityError } from './quantityError';

export type Quantity = number;

const validate = (value: number): Array<string> => {
  const issues: Array<string> = [];
  if (!Number.isInteger(value)) {
    issues.push('整数で指定ください');
  }
  if (value < 1) {
    issues.push('1個以上にしてください');
  }
  if (value > 10) {
    issues.push('10個までしか含められません');
  }
  return issues;
};

const build = (value: number): Quantity => {
  let issues: Array<string>;
  assert((issues = validate(value)).length === 0, issues.join('\n'));
  return value;
};

const safeBuild = (value: number): Result<Quantity, QuantityError> => {
  const issues = validate(value);
  return issues.length ? err(QuantityError.build(issues)) : ok(value);
};

export const Quantity = {
  build,
  safeBuild,
} as const;
