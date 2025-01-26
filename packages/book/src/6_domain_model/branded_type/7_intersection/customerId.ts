import type { Brand } from './brand.js';

export type CustomerId = Brand<number, 'CustomerId'>;
export const CustomerId = (value: number): CustomerId => value as CustomerId;
