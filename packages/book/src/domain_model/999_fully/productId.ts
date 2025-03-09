import assert from 'assert';
import type { Eq } from 'domain_model/999_fully/eq.js';
import { isValid } from 'ulidx';

export type ProductId = string;

const build = (value: string): ProductId => {
  assert(isValid(value), 'ULIDにしてください');
  return value;
};

const equals: Eq<ProductId> = (x: ProductId, y: ProductId): boolean => x === y;

export const ProductId = {
  build,
  equals,
} as const;
