import type { Result } from 'neverthrow';
import * as z from 'zod';
import type { QuantityRefinementsError } from './cartError.js';
import { Price } from './price.js';
import { ProductId } from './productId.js';
import { Quantity } from './quantity.js';

const schema = z
  .object({
    productId: ProductId.schema,
    price: Price.schema,
    quantity: Quantity.schema,
  })
  .readonly();

type CartItem = z.infer<typeof schema>;

const buildSingle = (productId: ProductId, price: Price): CartItem => ({
  productId,
  quantity: Quantity.build(1),
  price,
});

const add =
  (quantity: Quantity, price: Price) =>
  (item: CartItem): Result<CartItem, QuantityRefinementsError> =>
    Quantity.safeBuild(item.quantity + quantity).map((newQuantity) => ({
      ...item,
      quantity: newQuantity,
      price,
    }));

const calculateTotal = ({ price, quantity }: CartItem): number => price * quantity;

const identify = (x: CartItem, y: CartItem): boolean => x.productId === y.productId;

const CartItem = {
  schema,
  add,
  calculateTotal,
  buildSingle,
  identify,
} as const;

export { CartItem };
