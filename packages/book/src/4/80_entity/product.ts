import type { Eq } from './eq';

export type Product = Readonly<{
  id: string;
  name: string;
  price: number;
}>;

const isSameIdentity: Eq<Product> = (x: Product, y: Product): boolean => x.id === y.id;

const changePrice =
  (price: number) =>
  (product: Product): Product => ({ ...product, price });

export const Product = {
  changePrice,
  isSameIdentity,
} as const;
