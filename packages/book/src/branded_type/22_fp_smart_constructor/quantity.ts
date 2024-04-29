import assert from 'node:assert';
import type { Brand } from '../7_intersection/brand';
import { QuantityError } from './quantityError';
import type { Result } from './result';
import { Failure, Success } from './result';

declare const tag: unique symbol;
type RawType = number;
export type Quantity = Brand<RawType, typeof tag>;

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

const cast = (value: number): Quantity => value as Quantity;

const build = (value: number): Quantity => {
  let issues: Array<string>;
  assert((issues = validate(value)).length === 0, issues.join('\n'));
  return cast(value);
};

const safeBuild = (value: number): Result<QuantityError, Quantity> => {
  const issues = validate(value);
  return issues.length ? Failure(QuantityError.build(issues)) : Success(cast(value));
};

export const Quantity = {
  build,
  safeBuild,
} as const;
