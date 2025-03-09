import { nameSchema } from '6_domain_model/branded_type/35_zod_branded/name.js';
import { priceSchema } from '6_domain_model/branded_type/35_zod_branded/price.js';
import { z } from 'zod';

declare const ProductBrand: unique symbol;
export const productSchema = z
  .object({
    name: nameSchema,
    price: priceSchema,
  })
  .brand(ProductBrand);

export type Product = z.infer<typeof productSchema>;
