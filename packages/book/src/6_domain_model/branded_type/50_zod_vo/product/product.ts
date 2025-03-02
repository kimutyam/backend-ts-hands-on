import type { Eq } from '../eq.js';
import { Name } from './name.js';
import { Price } from './price.js';

export type Product = Readonly<{
  name: Name;
  price: Price;
}>;
const equals: Eq<Product> = (
  x: Product,
  y: Product,
): boolean =>
  Name.equals(x.name, y.name) &&
  Price.equals(x.price, y.price);

export const Product = {
  equals,
} as const;
