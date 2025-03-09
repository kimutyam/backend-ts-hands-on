import type { Eq } from 'domain_model/75_vo_eq/eq.js';

export type Quantity = number;

const equals: Eq<Quantity> = (
  x: Quantity,
  y: Quantity,
): boolean => x === y;

export const Quantity = {
  equals,
} as const;
