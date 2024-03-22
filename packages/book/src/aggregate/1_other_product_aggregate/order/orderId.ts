import { Ulid } from '../ulid';

export type OrderId = string;

export const OrderId = {
  ...Ulid,
} as const;
