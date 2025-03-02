import type { Product } from './product.js';

export type Item = Readonly<{
  product: Product;
  quantity: number;
}>;

export const add =
  (quantity: number) =>
  (item: Item): Item => ({
    ...item,
    quantity: item.quantity + quantity,
  });

export const calculateTotal = ({
  product,
  quantity,
}: Item): number => product.price * quantity;

const build = (
  product: Product,
  quantity: number,
): Item => ({
  product,
  quantity,
});

export const buildSingle = (product: Product): Item => ({
  product,
  quantity: 1,
});

export const Item = {
  build,
  buildSingle,
  add,
  total: calculateTotal,
} as const;
