import type { Product } from '../20_fp/product';
import { OrderQuantity } from './orderQuantity';

export type OrderItem = Readonly<{
  product: Product;
  quantity: OrderQuantity;
}>;

const add =
  (quantity: OrderQuantity) =>
  (orderItem: OrderItem): OrderItem => ({
    ...orderItem,
    quantity: new OrderQuantity(orderItem.quantity.value + quantity.value),
  });

const calculateTotal = ({ product, quantity }: OrderItem): number => product.price * quantity.value;

const build = (product: Product, quantity: OrderQuantity): OrderItem => ({
  product,
  quantity,
});

const buildSingle = (product: Product): OrderItem => ({
  product,
  quantity: new OrderQuantity(1),
});

export const OrderItem = {
  build,
  buildSingle,
  add,
  total: calculateTotal,
} as const;
