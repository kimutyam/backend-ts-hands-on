import assert from 'assert';
import type { Eq } from './eq.js';

export type Price = number;

const build = (value: number): Price => {
  assert(Number.isInteger(value), '整数で指定ください');
  assert(value >= 100, '100円以上にしてください');
  assert(value <= 10_000, '1万円が上限です');
  return value;
};

const equals: Eq<Price> = (x: Price, y: Price): boolean => x === y;

export const Price = {
  equals,
  build,
} as const;
