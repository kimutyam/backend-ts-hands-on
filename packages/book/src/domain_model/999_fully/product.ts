import type { Eq } from 'domain_model/999_fully/eq.js';
import type { Price } from 'domain_model/999_fully/price.js';
import { ProductId } from 'domain_model/999_fully/productId.js';

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
