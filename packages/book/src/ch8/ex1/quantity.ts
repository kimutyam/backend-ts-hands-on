import assert from 'node:assert';

import type { Brand } from 'ch8/ex1/brand.js';

const name = 'Quantity';
type Quantity = number & Brand<typeof name>;

const assertQuantity = (value: Quantity): void => {
  assert(Number.isInteger(value), '数量は整数で指定してください');
  assert(value >= 1, '数量は1以上にしてください');
  assert(value <= 10, '数量は10以下にしてください');
};

const valueOf = (value: number): Quantity => {
  const v = value as Quantity;
  assertQuantity(v);
  return v;
};

const Quantity = {
  name,
  valueOf,
} as const;

export { Quantity };
