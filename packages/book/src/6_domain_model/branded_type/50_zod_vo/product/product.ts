import type { Eq } from '6_domain_model/branded_type/50_zod_vo/eq.js';
import { Name } from '6_domain_model/branded_type/50_zod_vo/product/name.js';
import { Price } from '6_domain_model/branded_type/50_zod_vo/product/price.js';

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
