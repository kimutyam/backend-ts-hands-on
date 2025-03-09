import { z } from 'zod';
import { Price } from 'zod_blog/16_domain_zod_neverthrow/product/price.js';
import { ProductId } from 'zod_blog/16_domain_zod_neverthrow/product/productId.js';

const schema = z
  .object({
    id: ProductId.schema,
    price: Price.schema,
  })
  .readonly();

export type Product = z.infer<typeof schema>;

export const Product = {
  schema,
} as const;
