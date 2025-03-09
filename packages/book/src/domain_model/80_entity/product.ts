import type { Eq } from 'domain_model/80_entity/eq.js';

export type Product = Readonly<{
  productId: string;
  name: string;
  price: number;
}>;

const isSameIdentity: Eq<Product> = (
  x: Product,
  y: Product,
): boolean => x.productId === y.productId;

const changePrice =
  (price: number) =>
  (product: Product): Product => ({ ...product, price });

export const Product = {
  changePrice,
  isSameIdentity,
} as const;
