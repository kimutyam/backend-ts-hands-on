import type { Result } from 'neverthrow';
import type { Product } from '../20_fp/product';
import { OrderQuantity } from './orderQuantity';
import type { OrderQuantityError } from './orderQuantityError';

export type OrderItem = Readonly<{
  product: Product;
  quantity: OrderQuantity;
}>;

const add =
  (quantity: OrderQuantity) =>
  (orderItem: OrderItem): Result<OrderItem, OrderQuantityError> =>
    OrderQuantity.safeBuild(orderItem.quantity + quantity).map((t) => ({
      ...orderItem,
      quantity: t,
    }));

const calculateTotal = ({ product, quantity }: OrderItem): number => product.price * quantity;

const build = (product: Product, quantity: OrderQuantity): OrderItem => ({
  product,
  quantity: OrderQuantity.build(quantity),
});

const buildSingle = (product: Product): OrderItem => ({
  product,
  quantity: OrderQuantity.build(1),
});

export const OrderItem = {
  build,
  buildSingle,
  add,
  total: calculateTotal,
} as const;
