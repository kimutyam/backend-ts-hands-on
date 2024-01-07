import type { Brand } from './brand';

declare const tag: unique symbol;
export type CustomerId = Brand<number, typeof tag>;
export const CustomerId = (value: number): CustomerId => value as CustomerId;
