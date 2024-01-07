import type { Brand } from './brand';

declare const tag: unique symbol;
export type AccountBalance = Brand<number, typeof tag>;
export const AccountBalance = (value: number): AccountBalance => value as AccountBalance;
