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
    quantity: OrderQuantity.schema,
  })
  .readonly();

export type OrderItem = z.infer<typeof schema>;

const add =
  (quantity: OrderQuantity) =>
  (orderItem: OrderItem): Result<OrderItem, z.ZodError<OrderQuantityInput>> =>
    OrderQuantity.safeBuild(orderItem.quantity + quantity).map((newQuantity) => ({
      ...orderItem,
      quantity: newQuantity,
    }));

const calculateTotal = ({ price, quantity }: OrderItem): number => price * quantity;

const buildSingle = (productId: ProductId, price: Price): OrderItem => ({
  productId,
  price,
  quantity: OrderQuantity.build(1),
});

// NOTE: エンティティとみなす
const isSameIdentity: Eq<OrderItem> = (x: OrderItem, y: OrderItem): boolean =>
  x.productId === y.productId;

export const OrderItem = {
  schema,
  isSameIdentity,
  buildSingle,
  add,
  calculateTotal,
} as const;
