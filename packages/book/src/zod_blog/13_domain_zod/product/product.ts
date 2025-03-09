import { z } from 'zod';
import { Price } from 'zod_blog/13_domain_zod/product/price.js';

const schema = z.object({
  id: z.string().uuid(),
  price: Price.schema,
});

export type Product = Readonly<{
  id: string;
  price: Price;
}>;

export const Product = {
  schema,
} as const;
