import { z } from 'zod';

declare const ProductIdBrand: unique symbol;

export const productIdSchema = z
  .string()
  .brand(ProductIdBrand);

export type ProductId = z.infer<typeof productIdSchema>;
