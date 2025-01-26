import type { Eq } from './eq.js';
import { Product } from './product.js';
import { Quantity } from './quantity.js';

export type Item = Readonly<{
  product: Product;
  quantity: Quantity;
}>;

const equals: Eq<Item> = (x: Item, y: Item): boolean =>
  Product.equals(x.product, y.product) && Quantity.equals(x.quantity, y.quantity);

export const Item = {
  equals,
} as const;
