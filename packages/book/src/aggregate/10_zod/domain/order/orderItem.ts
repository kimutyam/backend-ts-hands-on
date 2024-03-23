import type { Result } from 'neverthrow';
import * as z from 'zod';
import type { Eq } from '../../util/eq';
import { Price } from '../price/price';
import { ProductId } from '../product/productId';
import type { OrderQuantityInput } from './orderQuantity';
import { OrderQuantity } from './orderQuantity';

const schema = z
  .object({
    productId: ProductId.schema,
    price: Price.schema,
    orderQuantity: OrderQuantity.schema,
  })
  .readonly();

export type OrderItem = z.infer<typeof schema>;

const add =
  (quantity: OrderQuantity) =>
  (orderItem: OrderItem): Result<OrderItem, z.ZodError<OrderQuantityInput>> =>
    OrderQuantity.safeBuild(orderItem.orderQuantity + quantity).map((newQuantity) => ({
      ...orderItem,
      quantity: newQuantity,
    }));

const calculateTotal = ({ price, orderQuantity }: OrderItem): number => price * orderQuantity;

const buildSingle = (productId: ProductId, price: Price): OrderItem => ({
  productId,
  price,
  orderQuantity: OrderQuantity.build(1),
});

const isSameIdentity: Eq<OrderItem> = (x: OrderItem, y: OrderItem): boolean =>
  x.productId === y.productId;

export const OrderItem = {
  schema,
  isSameIdentity,
  buildSingle,
  add,
  calculateTotal,
} as const;
