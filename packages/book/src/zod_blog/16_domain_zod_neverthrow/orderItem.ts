import type { Result } from 'neverthrow';
import { z } from 'zod';
import type { OrderQuantityInput } from './orderQuantity';
import { OrderQuantity } from './orderQuantity';
import { Product } from './product/product';

const schema = z
  .object({
    quantity: OrderQuantity.schema,
    product: Product.schema,
  })
  .readonly();

export type OrderItem = z.infer<typeof schema>;

const buildSingle = (product: Product): OrderItem => ({
  product,
  quantity: OrderQuantity.build(1),
});

const add =
  (quantity: OrderQuantity) =>
  (orderItem: OrderItem): Result<OrderItem, z.ZodError<OrderQuantityInput>> =>
    OrderQuantity.safeBuild(orderItem.quantity + quantity).map((newQuantity) => ({
      ...orderItem,
      quantity: newQuantity,
    }));

const calculateTotal = ({ product, quantity }: OrderItem): number => product.price * quantity;

export const OrderItem = {
  buildSingle,
  add,
  total: calculateTotal,
  schema,
} as const;
