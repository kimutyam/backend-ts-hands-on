import type { Eq } from 'ch6/archive/branded_type/ex50/eq.js';
import { Name } from 'ch6/archive/branded_type/ex50/product/name.js';
import { Price } from 'ch6/archive/branded_type/ex50/product/price.js';

export type Product = Readonly<{
  name: Name;
  price: Price;
}>;
const equals: Eq<Product> = (x: Product, y: Product): boolean =>
  Name.equals(x.name, y.name) && Price.equals(x.price, y.price);

export const Product = {
  equals,
} as const;
