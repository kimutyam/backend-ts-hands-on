import type { Product } from 'domain_model/20_fp/product.js';
import { Quantity } from 'domain_model/30_fp_assert/quantity.js';

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
