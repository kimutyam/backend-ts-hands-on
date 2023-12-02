import assert from 'node:assert';
import { OrderQuantityError } from './orderQuantityError';
import type { Result } from './result';
import { Failure, Success } from './result';

export type OrderQuantity = number;

const validate = (value: number): Array<string> => {
  const issues: Array<string> = [];
  if (!Number.isInteger(value)) {
    issues.push('整数で指定ください');
  }
  if (value < 1) {
    issues.push('1個以上にしてください');
  }
  if (value >= 10) {
    issues.push('1つの注文に含められるのは10個までです');
  }
  return issues;
};

const build = (value: number): OrderQuantity => {
  let issues: Array<string>;
  assert((issues = validate(value)).length === 0, issues.join('\n'));
  return value;
};

const safeBuild = (value: number): Result<OrderQuantityError, OrderQuantity> => {
  const issues = validate(value);
  return issues.length ? Failure(OrderQuantityError.build(issues)) : Success(value);
};

export const OrderQuantity = {
  build,
  safeBuild,
} as const;
