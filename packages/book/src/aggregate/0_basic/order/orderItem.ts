import type { Result } from 'neverthrow';
import type { Eq } from '../eq';
import type { Product } from '../product/product';
import { OrderQuantity } from './orderQuantity';
import type { OrderQuantityError } from './orderQuantityError';

export type OrderItem = Readonly<{
  product: Product;
  quantity: OrderQuantity;
}>;

const add =
  (quantity: OrderQuantity) =>
  (orderItem: OrderItem): Result<OrderItem, OrderQuantityError> =>
    OrderQuantity.safeBuild(orderItem.quantity + quantity).map((newQuantity) => ({
      ...orderItem,
      quantity: newQuantity,
    }));

const calculateTotal = ({ product, quantity }: OrderItem): number => product.price * quantity;

const buildSingle = (product: Product): OrderItem => ({
  product,
  quantity: OrderQuantity.build(1),
});

// NOTE: エンティティとみなす
const isSameIdentity: Eq<OrderItem> = (x: OrderItem, y: OrderItem): boolean =>
  x.product.productId === y.product.productId;

export const OrderItem = {
  isSameIdentity,
  buildSingle,
  add,
  calculateTotal,
} as const;
