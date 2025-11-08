import assert from 'node:assert';

import { isValid, ulid } from 'ulidx';

import type { Brand } from './brand.js';

const name = 'OrderId';
type OrderId = string & Brand<typeof name>;

const equals = (a: OrderId, b: OrderId): boolean => a === b;

const assertOrderId = (value: OrderId): void => {
  assert(isValid(value), 'ULIDで指定ください');
};

const valueOf = (value: string): OrderId => {
  const v = value as OrderId;
  assertOrderId(v);
  return v;
};

const generate = (): OrderId => valueOf(ulid());

const OrderId = {
  name,
  valueOf,
  equals,
  generate,
} as const;

export { OrderId };
