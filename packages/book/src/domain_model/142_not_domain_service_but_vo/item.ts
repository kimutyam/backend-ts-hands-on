import type { Product } from 'domain_model/140_domain_service/types.js';

export type Item = Readonly<{
  product: Product;
  quantity: number;
}>;

export const calculateTotalPrice = ({ product, quantity }: Item): number =>
  product.price * quantity;

export const Item = {
  calculateTotalPrice,
} as const;
