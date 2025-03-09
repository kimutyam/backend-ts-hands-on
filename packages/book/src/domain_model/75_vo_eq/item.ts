import type { Eq } from 'domain_model/75_vo_eq/eq.js';
import { Product } from 'domain_model/75_vo_eq/product.js';
import { Quantity } from 'domain_model/75_vo_eq/quantity.js';

export type Item = Readonly<{
  product: Product;
  quantity: Quantity;
}>;

const equals: Eq<Item> = (x: Item, y: Item): boolean =>
  Product.equals(x.product, y.product) &&
  Quantity.equals(x.quantity, y.quantity);

export const Item = {
  equals,
} as const;
