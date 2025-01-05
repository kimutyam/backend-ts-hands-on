import { z } from 'zod';
import { nameSchema } from './name';
import { priceSchema } from './price';

declare const ProductBrand: unique symbol;
export const productSchema = z
  .object({
    name: nameSchema,
    price: priceSchema,
  })
  .brand(ProductBrand);

export type Product = z.infer<typeof productSchema>;
