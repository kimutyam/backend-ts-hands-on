import assert from 'node:assert';
import type { Brand } from '7_aggregate/1/brand.js';
import { isValid, ulid } from 'ulidx';

type ProductId = string & Brand<'ProductId'>;

const equals = (a: ProductId, b: ProductId): boolean =>
  a === b;

const assertProductId = (value: ProductId): void => {
  assert(isValid(value), 'ULIDで指定ください');
};

const build = (value: string): ProductId => {
  const v = value as ProductId;
  assertProductId(v);
  return v;
};

// 乱数生成器のシード
const SEED = 123;
const generate = (): ProductId => build(ulid(SEED));

const ProductId = {
  build,
  equals,
  generate,
} as const;

export { ProductId };
