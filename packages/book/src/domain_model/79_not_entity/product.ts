import type { Eq } from './eq';

export type Product = Readonly<{
  name: string;
  price: number;
}>;

const equals: Eq<Product> = (x: Product, y: Product): boolean =>
  x.name === y.name && x.price === y.price;

export const Product = {
  equals,
} as const;
