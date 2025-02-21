import assert from 'node:assert';
import type { Brand } from './brand.js';

type Price = number & Brand<'Price'>;

const assertQuantity = (value: Price): void => {
  assert(Number.isInteger(value), '値段は整数で指定してください');
  assert(value >= 100, '値段は100円以上にしてください');
  assert(value <= 10_000, '値段は10000円以下にしてください');
};

const build = (value: number): Price => {
  const v = value as Price;
  assertQuantity(v);
  return v;
};

const Price = {
  build,
} as const;

export { Price };
