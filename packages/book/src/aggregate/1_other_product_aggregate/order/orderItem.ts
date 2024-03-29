import type { Result } from 'neverthrow';
import type { Eq } from '../eq';
import type { Price } from '../price/price';
import type { ProductId } from '../product/productId';
import { OrderQuantity } from './orderQuantity';
import type { OrderQuantityError } from './orderQuantityError';

export type OrderItem = Readonly<{
  productId: ProductId;
  price: Price;
  quantity: OrderQuantity;
}>;

const add =
  (quantity: OrderQuantity) =>
  (orderItem: OrderItem): Result<OrderItem, OrderQuantityError> =>
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
  isSameIdentity,
  buildSingle,
  add,
  calculateTotal,
} as const;
