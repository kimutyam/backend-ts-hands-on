import type { CartItem } from '9_always_valid_domain_model/50/cartItem.js';
import type { Price } from '9_always_valid_domain_model/50/price.js';
import { ProductId } from '9_always_valid_domain_model/50/productId.js';
import { Quantity } from '9_always_valid_domain_model/50/quantity.js';
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
  ({
    productId,
    quantity,
  }: ModifyCartQuantityRequest): CartItem => ({
    productId,
    price,
    quantity: Quantity.build(quantity),
  });

const ModifyCartQuantityRequest = {
  schema,
  toCartItem,
} as const;

export { ModifyCartQuantityRequest };
