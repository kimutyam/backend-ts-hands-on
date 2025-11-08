import { z } from 'zod';

import type { CartItem } from './cartItem.js';
import { CustomerId } from './customerId.js';
import type { Price } from './price.js';
import { ProductId } from './productId.js';
import { Quantity } from './quantity.js';

// 1
const schema = z
  .object({
    customerId: CustomerId.schema,
    productId: ProductId.schema,
    quantity: z.number().int().min(1).max(2),
  })
  .readonly();

type ModifyCartQuantityRequest = z.infer<typeof schema>;

// 2
const toCartItem =
  (price: Price) =>
  (req: ModifyCartQuantityRequest): CartItem => {
    const { productId, quantity } = req;
    return {
      productId,
      price,
      quantity: Quantity.parse(quantity),
    };
  };

const ModifyCartQuantityRequest = {
  schema,
  toCartItem,
} as const;

export { ModifyCartQuantityRequest };
