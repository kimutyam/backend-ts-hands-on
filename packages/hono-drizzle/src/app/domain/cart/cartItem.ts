import type { Result } from 'neverthrow';
import * as z from 'zod';

import { Price } from '../product/price.js';
import { ProductId } from '../product/productId.js';
import type { QuantityRefinementsError } from './quantity.js';
import { Quantity } from './quantity.js';

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
  parse({
    productId,
    quantity: Quantity.parse(1),
    price,
  });

const add =
  (quantity: Quantity, price: Price) =>
  (item: CartItem): Result<CartItem, QuantityRefinementsError> =>
    Quantity.safeParse(item.quantity + quantity).map((newQuantity) =>
      parse({
        ...item,
        quantity: newQuantity,
        price,
      }),
    );

const calculateTotal = ({ price, quantity }: CartItem): number =>
  price * quantity;

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
