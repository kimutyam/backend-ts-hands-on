import assert from 'assert';
import { isValid } from 'ulidx';
import type { Eq } from './eq.js';

export type ProductId = string;

const build = (value: string): ProductId => {
  assert(isValid(value), 'ULIDにしてください');
  return value;
};

const equals: Eq<ProductId> = (
  x: ProductId,
  y: ProductId,
): boolean => x === y;

export const ProductId = {
  build,
  equals,
} as const;
