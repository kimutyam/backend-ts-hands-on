import type { Result } from 'neverthrow';
import { z } from 'zod';
import type { OrderQuantityInput } from 'zod_blog/16_domain_zod_neverthrow/orderQuantity.js';
import { OrderQuantity } from 'zod_blog/16_domain_zod_neverthrow/orderQuantity.js';
import { Product } from 'zod_blog/16_domain_zod_neverthrow/product/product.js';

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
  (
    orderItem: OrderItem,
  ): Result<OrderItem, z.ZodError<OrderQuantityInput>> =>
    OrderQuantity.safeBuild(
      orderItem.quantity + quantity,
    ).map((newQuantity) => ({
      ...orderItem,
      quantity: newQuantity,
    }));

const calculateTotal = ({
  product,
  quantity,
}: OrderItem): number => product.price * quantity;

export const OrderItem = {
  buildSingle,
  add,
  total: calculateTotal,
  schema,
} as const;
