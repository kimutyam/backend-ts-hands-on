import type { CartItem } from 'ch9/ex50/cartItem.js';
import type { Price } from 'ch9/ex50/price.js';
import { ProductId } from 'ch9/ex50/productId.js';
import { Quantity } from 'ch9/ex50/quantity.js';
import { z } from 'zod';

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
    quantity: Quantity.parse(quantity),
  });

const ModifyCartQuantityRequest = {
  schema,
  toCartItem,
} as const;

export { ModifyCartQuantityRequest };
