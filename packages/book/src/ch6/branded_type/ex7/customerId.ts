import type { Brand } from 'ch6/branded_type/ex7/brand.js';

export type CustomerId = Brand<number, 'CustomerId'>;
export const CustomerId = (value: number): CustomerId => value as CustomerId;
