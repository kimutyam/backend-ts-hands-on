import type { Result } from 'neverthrow';
import * as z from 'zod';

import { Price } from '../product/price.js';
import { ProductId } from '../product/productId.js';
import type { QuantityRefinementsError } from './cartError.js';
import { Quantity } from './quantity.js';

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
  quantity: Quantity.parse(1),
  price,
});

const add =
  (quantity: Quantity, price: Price) =>
  (item: CartItem): Result<CartItem, QuantityRefinementsError> =>
    Quantity.safeParse(item.quantity + quantity).map((newQuantity) => ({
      ...item,
      quantity: newQuantity,
      price,
    }));

const calculateTotal = ({ price, quantity }: CartItem): number =>
  price * quantity;

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
