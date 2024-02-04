import type { Result } from 'neverthrow';
import type { z } from 'zod';
import type { Eq } from './eq';
import type { OrderQuantityInput } from './orderQuantity';
import { OrderQuantity } from './orderQuantity';
import { Product } from './product';

export type OrderItem = Readonly<{
  product: Product;
  quantity: OrderQuantity;
}>;

const add =
  (quantity: OrderQuantity) =>
  (orderItem: OrderItem): Result<OrderItem, z.ZodError<OrderQuantityInput>> =>
    OrderQuantity.safeBuild(orderItem.quantity + quantity).map((t) => ({
      ...orderItem,
      quantity: t,
    }));

const calculateTotal = ({ product, quantity }: OrderItem): number => product.price * quantity;

const buildSingle = (product: Product): OrderItem => ({
  product,
  quantity: OrderQuantity.build(1),
});

const equals: Eq<OrderItem> = (x: OrderItem, y: OrderItem): boolean =>
  Product.equals(x.product, y.product) && OrderQuantity.equals(x.quantity, y.quantity);

export const OrderItem = {
  buildSingle,
  add,
  total: calculateTotal,
  equals,
} as const;
