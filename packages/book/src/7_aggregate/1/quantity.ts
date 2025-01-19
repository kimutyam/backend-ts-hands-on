import assert from 'node:assert';
import type { Brand } from './brand';

type Quantity = number & Brand<'Quantity'>;

const assertQuantity = (value: Quantity): void => {
  assert(Number.isInteger(value), '数量は整数で指定してください');
  assert(value >= 1, '数量は1以上にしてください');
  assert(value <= 10, '数量は10以下にしてください');
};

const build = (value: number): Quantity => {
  const v = value as Quantity;
  assertQuantity(v);
  return v;
};

const add = (a: Quantity, b: Quantity): Quantity => Quantity.build(a + b);

const Quantity = {
  build,
  add,
} as const;

export { Quantity };
