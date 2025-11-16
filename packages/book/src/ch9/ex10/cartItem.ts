import * as z from 'zod';

import { Price } from './price.js';
import { ProductId } from './productId.js';
import type { QuantityZodError } from './quantity.js';
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
type CartItemInput = z.input<typeof schema>;

const parse = (input: CartItemInput): CartItem => schema.parse(input);

const createSingleQuantity = (productId: ProductId, price: Price): CartItem =>
  // 2
  parse({
    productId,
    quantity: 1,
    price,
  });

const add =
  (quantity: Quantity, price: Price) =>
  (item: CartItem): CartItem | QuantityZodError => {
    // 3
    const result = Quantity.safeParse(item.quantity + quantity);
    return result.success
      ? parse({
          ...item,
          quantity: result.data,
          price,
        })
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
  parse,
  add,
  calculateTotal,
  createSingleQuantity,
  identify,
} as const;

export { CartItem };
