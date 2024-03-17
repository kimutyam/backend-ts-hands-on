import type { Eq } from './eq';
import type { Price } from './price';
import { ProductId } from './productId';

export type Product = Readonly<{
  productId: ProductId;
  name: string;
  price: Price;
}>;

const isSameIdentity: Eq<Product> = (x: Product, y: Product): boolean =>
  ProductId.equals(x.productId, y.productId);

const changePrice =
  (price: Price) =>
  (product: Product): Product => ({ ...product, price });

export const Product = {
  changePrice,
  isSameIdentity,
} as const;
