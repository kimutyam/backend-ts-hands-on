import type { Nominal } from './nominal';

const name = 'OrderQuantity';
export type OrderQuantity = Nominal<typeof name, number>;
const build = (value: number): OrderQuantity => ({
  name,
  value,
});

export const OrderQuantity = {
  build,
} as const;
