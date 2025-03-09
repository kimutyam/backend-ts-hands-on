import { nameSchema } from 'ch6/branded_type/ex35/name.js';
import { priceSchema } from 'ch6/branded_type/ex35/price.js';
import { z } from 'zod';

declare const ProductBrand: unique symbol;
export const productSchema = z
  .object({
    name: nameSchema,
    price: priceSchema,
  })
  .brand(ProductBrand);

export type Product = z.infer<typeof productSchema>;
