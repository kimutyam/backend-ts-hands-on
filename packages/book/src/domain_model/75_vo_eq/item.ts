import type { Eq } from './eq';
import { Product } from './product';
import { Quantity } from './quantity';

export type Item = Readonly<{
  product: Product;
  quantity: Quantity;
}>;

const equals: Eq<Item> = (x: Item, y: Item): boolean =>
  Product.equals(x.product, y.product) && Quantity.equals(x.quantity, y.quantity);

export const Item = {
  equals,
} as const;
