import type { Eq } from '6_domain_model/branded_type/54_zod_entity/eq.js';
import type { ProductId } from '6_domain_model/branded_type/54_zod_entity/productId.js';

export type Product = Readonly<{
  id: ProductId;
  name: string;
  price: number;
}>;

const isSameIdentity: Eq<Product> = (
  x: Product,
  y: Product,
): boolean => x.id === y.id;

const changePrice =
  (price: number) =>
  (product: Product): Product => ({ ...product, price });

export const Product = {
  changePrice,
  isSameIdentity,
} as const;
