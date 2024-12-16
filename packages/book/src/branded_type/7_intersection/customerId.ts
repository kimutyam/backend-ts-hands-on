import type { Brand } from './brand';

export type CustomerId = Brand<number, 'CustomerId'>;
export const CustomerId = (value: number): CustomerId => value as CustomerId;
