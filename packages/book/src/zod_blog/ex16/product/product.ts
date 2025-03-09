import { z } from 'zod';
import { Price } from 'zod_blog/ex16/product/price.js';
import { ProductId } from 'zod_blog/ex16/product/productId.js';

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
