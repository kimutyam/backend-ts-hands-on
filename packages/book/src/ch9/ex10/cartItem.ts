import * as z from 'zod';

import { Price } from './price.js';
import { ProductId } from './productId.js';
import type { QuantityInput } from './quantity.js';
import { Quantity } from './quantity.js';

// 1
const schema = z
  .object({
    productId: ProductId.schema,
    price: Price.schema,
    quantity: Quantity.schema,
  })
  .readonly();

type CartItem = z.infer<typeof schema>;

const createSingleQuantity = (
  productId: ProductId,
  price: Price,
): CartItem => ({
  productId,
  // 2
  quantity: Quantity.parse(1),
  price,
});

const add =
  (quantity: Quantity, price: Price) =>
  (item: CartItem): CartItem | z.ZodError<QuantityInput> => {
    // 3
    const result = Quantity.safeParse(item.quantity + quantity);
    return result.success
      ? {
          ...item,
          quantity: result.data,
          price,
        }
      : result.error;
  };

const calculateTotal = (item: CartItem): number => {
  const { price, quantity } = item;
  return price * quantity;
};

const identify = (x: CartItem, y: CartItem): boolean =>
  x.productId === y.productId;

const CartItem = {
  schema,
  add,
  calculateTotal,
  createSingleQuantity,
  identify,
} as const;

export { CartItem };
