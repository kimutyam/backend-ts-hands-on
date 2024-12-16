import type { Brand } from './brand';

export type AccountBalance = Brand<number, 'AccountBalance'>;
export const AccountBalance = (value: number): AccountBalance => value as AccountBalance;
