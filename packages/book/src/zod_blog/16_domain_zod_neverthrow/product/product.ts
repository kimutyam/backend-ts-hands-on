import { z } from 'zod';
import { Price } from './price';
import { ProductId } from './productId';

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
