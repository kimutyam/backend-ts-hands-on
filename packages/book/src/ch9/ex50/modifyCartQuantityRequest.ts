import type { CartItem } from 'ch9/ex50/cartItem.js';
import { CustomerId } from 'ch9/ex50/customerId.js';
import type { Price } from 'ch9/ex50/price.js';
import { ProductId } from 'ch9/ex50/productId.js';
import { Quantity } from 'ch9/ex50/quantity.js';
import { z } from 'zod';

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
