import type { Eq } from '../eq';
import { Name } from './name';
import { Price } from './price';

export type Product = Readonly<{
  name: Name;
  price: Price;
}>;
const equals: Eq<Product> = (x: Product, y: Product): boolean =>
  Name.equals(x.name, y.name) && Price.equals(x.price, y.price);

export const Product = {
  equals,
} as const;
