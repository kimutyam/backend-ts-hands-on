import assert from 'assert';
import { isValid } from 'ulidx';
import type { Eq } from '../eq';

export type OrderId = string;

const build = (value: string): OrderId => {
  assert(isValid(value), 'ULIDにしてください');
  return value;
};

const equals: Eq<OrderId> = (x: OrderId, y: OrderId): boolean => x === y;

export const OrderId = {
  build,
  equals,
} as const;
