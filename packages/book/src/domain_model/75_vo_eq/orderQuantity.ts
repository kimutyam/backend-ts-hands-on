import type { Eq } from './eq';

export type OrderQuantity = number;

const equals: Eq<OrderQuantity> = (x: OrderQuantity, y: OrderQuantity): boolean => x === y;

export const OrderQuantity = {
  equals,
} as const;
