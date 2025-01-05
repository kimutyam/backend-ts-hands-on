import assert from 'node:assert';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

type Price = number;

const validatePrice = (raw: number): ReadonlyArray<string> => {
  const errors: Array<string> = [];
  if (!Number.isInteger(raw)) {
    errors.push('商品価格は整数で指定してください');
  }
  if (raw < 1_000) {
    errors.push('商品価格は1000円以上にしてください');
  }
  if (raw > 100_000) {
    errors.push('商品価格は10万円以下にしてください');
  }
  return errors;
};

const build = (raw: number): Price => {
  const errors = validatePrice(raw);
  assert(errors.length === 0, errors.join(', '));
  return raw;
};

const safeBuild = (raw: Price): Result<Price, ReadonlyArray<string>> => {
  const errors = validatePrice(raw);
  return errors.length <= 0 ? ok(raw) : err(errors);
};

const Price = {
  build,
  safeBuild,
} as const;

export { Price };
