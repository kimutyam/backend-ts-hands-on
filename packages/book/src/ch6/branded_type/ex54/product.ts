import type { Eq } from 'ch6/branded_type/ex54/eq.js';
import type { ProductId } from 'ch6/branded_type/ex54/productId.js';

export type Product = Readonly<{
  id: ProductId;
  name: string;
  price: number;
}>;

const isSameIdentity: Eq<Product> = (x: Product, y: Product): boolean =>
  x.id === y.id;

const changePrice =
  (price: number) =>
  (product: Product): Product => ({ ...product, price });

export const Product = {
  changePrice,
  isSameIdentity,
} as const;
