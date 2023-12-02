import assert from 'assert';

export type OrderQuantity = number;

const build = (value: number): OrderQuantity => {
  assert(Number.isInteger(value), '整数で指定ください');
  assert(value >= 1, '1個以上にしてください');
  assert(value <= 10, '1つの注文に含められるのは10個までです');
  return value;
};
export const OrderQuantity = {
  build,
} as const;
