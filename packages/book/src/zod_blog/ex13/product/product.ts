import { z } from 'zod';
import { Price } from 'zod_blog/ex13/product/price.js';

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
