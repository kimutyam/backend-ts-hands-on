import assert from 'assert';

export type Quantity = number;

const build = (value: number): Quantity => {
  assert(Number.isInteger(value), '整数で指定ください');
  assert(value >= 1, '1個以上にしてください');
  assert(value <= 10, '10個までしか含められません');
  return value;
};
export const Quantity = {
  build,
} as const;
