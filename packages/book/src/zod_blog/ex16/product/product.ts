import { z } from 'zod';

import { Price } from './price.js';
import { ProductId } from './productId.js';

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
