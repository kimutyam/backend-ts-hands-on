import assert from 'node:assert';

import type { Brand } from 'ch8/ex1/brand.js';
import { isValid, ulid } from 'ulidx';

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
