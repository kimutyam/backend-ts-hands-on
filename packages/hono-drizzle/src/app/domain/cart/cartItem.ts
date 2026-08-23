import type { Result } from 'neverthrow';
import { z } from 'zod';

import type { QuantityInvariantViolationError } from '#/app/domain/cart/quantity.js';
import { Quantity } from '#/app/domain/cart/quantity.js';
import { Price } from '#/app/domain/product/price.js';
import { ProductId } from '#/app/domain/product/productId.js';

const name = 'CartItem';

const schema = z
  .object({
    productId: ProductId.schema,
    price: Price.schema,
    quantity: Quantity.schema,
  })
  .readonly()
  .brand(name)
  .meta({
    id: name,
    description: 'カート項目',
  });

type CartItemInput = z.input<typeof schema>;
type CartItem = z.output<typeof schema>;

const parse = (input: CartItemInput): CartItem => schema.parse(input);

const createSingleQuantity = (productId: ProductId, price: Price): CartItem =>
  parse({
    productId,
    quantity: 1,
    price,
  });

const add =
  (quantity: Quantity, price: Price) =>
  (item: CartItem): Result<CartItem, QuantityInvariantViolationError> =>
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
