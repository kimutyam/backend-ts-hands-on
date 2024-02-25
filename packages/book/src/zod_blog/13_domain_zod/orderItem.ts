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
  (orderItem: OrderItem): OrderItem | z.ZodError<OrderQuantityInput> => {
    const result = OrderQuantity.safeBuild(orderItem.quantity + quantity);
    return result.success ? { product: orderItem.product, quantity: result.data } : result.error;
  };

const calculateTotal = ({ product, quantity }: OrderItem): number => product.price * quantity;

export const OrderItem = {
  buildSingle,
  add,
  total: calculateTotal,
  schema,
} as const;
