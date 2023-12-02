import type { Nominal } from './nominal';

const name = 'Price';
export type Price = Nominal<typeof name, number>;
