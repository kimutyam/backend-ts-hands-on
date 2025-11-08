import assert from 'node:assert';

import { isValid, ulid } from 'ulidx';

import type { Brand } from './brand.js';

const name = 'ProductId';
type ProductId = string & Brand<typeof name>;

const equals = (a: ProductId, b: ProductId): boolean => a === b;

const assertProductId = (value: ProductId): void => {
  assert(isValid(value), 'ULIDで指定ください');
};

const valueOf = (value: string): ProductId => {
  const v = value as ProductId;
  assertProductId(v);
  return v;
};

const generate = (): ProductId => valueOf(ulid());

const ProductId = {
  name,
  valueOf,
  equals,
  generate,
} as const;

export { ProductId };
