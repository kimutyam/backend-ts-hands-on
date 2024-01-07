import type { Eq } from '../80_entity/eq';
import type { ProductId } from './productId';

export type Product = Readonly<{
  id: ProductId;
  name: string;
  price: number;
}>;

const isSameIdentity: Eq<Product> = (x: Product, y: Product): boolean => x.id === y.id;

const changePrice =
  (price: number) =>
  (product: Product): Product => ({ ...product, price });

export const Product = {
  changePrice,
  isSameIdentity,
} as const;
