import type { Product } from '../20_fp/product';
import { Quantity } from './quantity';

export type Item = Readonly<{
  product: Product;
  quantity: Quantity;
}>;

const add =
  (quantity: Quantity) =>
  (item: Item): Item => ({
    ...item,
    quantity: new Quantity(item.quantity.value + quantity.value),
  });

const calculateTotal = ({ product, quantity }: Item): number => product.price * quantity.value;

const build = (product: Product, quantity: Quantity): Item => ({
  product,
  quantity,
});

const buildSingle = (product: Product): Item => ({
  product,
  quantity: new Quantity(1),
});

export const Item = {
  build,
  buildSingle,
  add,
  total: calculateTotal,
} as const;
