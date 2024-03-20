import assert from 'assert';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import type { Eq } from '../eq';
import { OrderQuantityError } from '../order/orderQuantityError';
import type { PriceError } from './priceError';

export type Price = number;

const validate = (value: number): Array<string> => {
  const issues: Array<string> = [];
  if (!Number.isInteger(value)) {
    issues.push('整数で指定ください');
  }
  if (value <= 100) {
    issues.push('100円以上にしてください');
  }
  if (value >= 10_000) {
    issues.push('1万円が上限です');
  }
  return issues;
};

const build = (value: number): Price => {
  let issues: Array<string>;
  assert((issues = validate(value)).length === 0, issues.join('\n'));
  return value;
};

const safeBuild = (value: number): Result<Price, PriceError> => {
  const issues = validate(value);
  return issues.length ? err(OrderQuantityError.build(issues)) : ok(value);
};

const equals: Eq<Price> = (x: Price, y: Price): boolean => x === y;

export const Price = {
  equals,
  build,
  safeBuild,
} as const;
