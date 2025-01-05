import type { Result } from 'neverthrow';
import type { z } from 'zod';
import type { Eq } from './eq';
import { Product } from './product/product';
import type { QuantityInput } from './quantity';
import { Quantity } from './quantity';

export type Item = Readonly<{
  product: Product;
  quantity: Quantity;
}>;

const add =
  (quantity: Quantity) =>
  (item: Item): Result<Item, z.ZodError<QuantityInput>> =>
    Quantity.safeBuild(item.quantity + quantity).map((newQuantity) => ({
      ...item,
      quantity: newQuantity,
    }));

const calculateTotal = ({ product, quantity }: Item): number => product.price * quantity;

const buildSingle = (product: Product): Item => ({
  product,
  quantity: Quantity.build(1),
});

const equals: Eq<Item> = (x: Item, y: Item): boolean =>
  Product.equals(x.product, y.product) && Quantity.equals(x.quantity, y.quantity);

export const Item = {
  buildSingle,
  add,
  total: calculateTotal,
  equals,
} as const;
