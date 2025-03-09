import type { Brand } from '6_domain_model/branded_type/7_intersection/brand.js';

export type CustomerId = Brand<number, 'CustomerId'>;
export const CustomerId = (value: number): CustomerId =>
  value as CustomerId;
