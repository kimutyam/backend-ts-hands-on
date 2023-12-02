import type { Product } from './product';

export type OrderItem = Readonly<{
  product: Product;
  quantity: number;
}>;

export const add =
  (quantity: number) =>
  (orderItem: OrderItem): OrderItem => ({
    ...orderItem,
    quantity: orderItem.quantity + quantity,
  });

export const calculateTotal = ({ product, quantity }: OrderItem): number =>
  product.price * quantity;

const build = (product: Product, quantity: number): OrderItem => ({
  product,
  quantity,
});

export const buildSingle = (product: Product): OrderItem => ({
  product,
  quantity: 1,
});

export const OrderItem = {
  build,
  buildSingle,
  add,
  total: calculateTotal,
} as const;
