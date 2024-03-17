import type { Product } from '../140_domain_service/types';

export type OrderItem = Readonly<{
  product: Product;
  quantity: number;
}>;

export const calculateTotalPrice = ({ product, quantity }: OrderItem): number =>
  product.price * quantity;

export const OrderItem = {
  calculateTotalPrice,
} as const;
