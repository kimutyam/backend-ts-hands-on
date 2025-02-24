import assert from 'node:assert';
import { isValid, ulid } from 'ulidx';
import type { Brand } from './brand.js';

const name = 'OrderId';
type OrderId = string & Brand<typeof name>;

const equals = (a: OrderId, b: OrderId): boolean => a === b;

const assertOrderId = (value: OrderId): void => {
  assert(isValid(value), 'ULIDで指定ください');
};

const build = (value: string): OrderId => {
  const v = value as OrderId;
  assertOrderId(v);
  return v;
};

// 乱数生成器のシード
const SEED = 123;
const generate = (): OrderId => build(ulid(SEED));

const OrderId = {
  name,
  build,
  equals,
  generate,
} as const;

export { OrderId };
