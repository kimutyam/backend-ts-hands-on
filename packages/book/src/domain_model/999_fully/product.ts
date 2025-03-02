import type { Eq } from './eq.js';
import type { Price } from './price.js';
import { ProductId } from './productId.js';

export type Product = Readonly<{
  productId: ProductId;
  name: string;
  price: Price;
}>;

const isSameIdentity: Eq<Product> = (
  x: Product,
  y: Product,
): boolean => ProductId.equals(x.productId, y.productId);

const changePrice =
  (price: Price) =>
  (product: Product): Product => ({ ...product, price });

export const Product = {
  changePrice,
  isSameIdentity,
} as const;
