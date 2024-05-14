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
    quantity: Quantity.build(item.quantity + quantity),
  });

const calculateTotal = ({ product, quantity }: Item): number => product.price * quantity;

const build = (product: Product, quantity: Quantity): Item => ({
  product,
  quantity: Quantity.build(quantity),
});

const buildSingle = (product: Product): Item => ({
  product,
  quantity: Quantity.build(1),
});

export const Item = {
  build,
  buildSingle,
  add,
  total: calculateTotal,
} as const;
