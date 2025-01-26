import type { Eq } from './eq.js';

export type Product = Readonly<{
  productId: string;
  name: string;
  price: number;
}>;

const isSameIdentity: Eq<Product> = (x: Product, y: Product): boolean =>
  x.productId === y.productId;

const changePrice =
  (price: number) =>
  (product: Product): Product => ({ ...product, price });

export const Product = {
  changePrice,
  isSameIdentity,
} as const;
