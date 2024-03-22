import { Ulid } from '../ulid';

export type CustomerId = string;

export const CustomerId = {
  ...Ulid,
} as const;
