import type { Eq } from 'ch6/branded_type/ex50/eq.js';
import { Product } from 'ch6/branded_type/ex50/product/product.js';
import type { QuantityInput } from 'ch6/branded_type/ex50/quantity.js';
import { Quantity } from 'ch6/branded_type/ex50/quantity.js';
import type { Result } from 'neverthrow';
import type { z } from 'zod';

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

const calculateTotal = ({ product, quantity }: Item): number =>
  product.price * quantity;

const buildSingle = (product: Product): Item => ({
  product,
  quantity: Quantity.build(1),
});

const equals: Eq<Item> = (x: Item, y: Item): boolean =>
  Product.equals(x.product, y.product) &&
  Quantity.equals(x.quantity, y.quantity);

export const Item = {
  buildSingle,
  add,
  total: calculateTotal,
  equals,
} as const;
