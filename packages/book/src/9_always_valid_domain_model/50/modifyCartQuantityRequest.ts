import { z } from 'zod';
import type { CartItem } from './cartItem.js';
import type { Price } from './price.js';
import { ProductId } from './productId.js';
import { Quantity } from './quantity.js';

// (1)
const schema = z
  .object({
    productId: ProductId.schema,
    quantity: z.number().int().min(1).max(2),
  })
  .readonly();

type ModifyCartQuantityRequest = z.infer<typeof schema>;

// (2)
const toCartItem =
  (price: Price) =>
  ({ productId, quantity }: ModifyCartQuantityRequest): CartItem => ({
    productId,
    price,
    quantity: Quantity.build(quantity),
  });

const ModifyCartQuantityRequest = {
  schema,
  toCartItem,
} as const;

export { ModifyCartQuantityRequest };
