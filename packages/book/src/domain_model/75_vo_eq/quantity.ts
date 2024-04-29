import type { Eq } from './eq';

export type Quantity = number;

const equals: Eq<Quantity> = (x: Quantity, y: Quantity): boolean => x === y;

export const Quantity = {
  equals,
} as const;
