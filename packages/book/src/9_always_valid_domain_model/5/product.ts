import type { Price } from './price.js';

interface Product {
  readonly productId: string;
  readonly price: Price;
}

const changePrice =
  (price: Price) =>
  (product: Product): Product => ({ ...product, price });

const Product = {
  changePrice,
} as const;

export { Product };
