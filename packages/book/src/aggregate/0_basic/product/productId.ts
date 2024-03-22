import { Ulid } from '../ulid';

export type ProductId = string;

export const ProductId = {
  ...Ulid,
} as const;
