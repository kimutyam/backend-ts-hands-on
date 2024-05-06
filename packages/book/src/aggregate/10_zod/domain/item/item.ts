import type { Result } from 'neverthrow';
import * as z from 'zod';
import type { Eq } from '../../util/eq';
import { Price } from '../price/price';
import { ProductId } from '../product/productId';
import type { QuantityError } from './quantity';
import { Quantity } from './quantity';

const schema = z
  .object({
    productId: ProductId.schema,
    price: Price.schema,
    quantity: Quantity.schema,
  })
  .readonly();

export type Item = z.infer<typeof schema>;

const add =
  (quantity: Quantity) =>
  (item: Item): Result<Item, QuantityError> =>
    Quantity.safeBuild(item.quantity + quantity).map((newQuantity) => ({
      ...item,
      quantity: newQuantity,
    }));

const calculateTotal = ({ price, quantity }: Item): number => price * quantity;

const buildSingle = (productId: ProductId, price: Price): Item => ({
  productId,
  price,
  quantity: Quantity.build(1),
});

const isSameIdentity: Eq<Item> = (x: Item, y: Item): boolean => x.productId === y.productId;

export const Item = {
  schema,
  isSameIdentity,
  buildSingle,
  add,
  calculateTotal,
} as const;
