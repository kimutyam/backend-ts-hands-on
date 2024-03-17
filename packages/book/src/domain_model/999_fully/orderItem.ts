import type { Result } from 'neverthrow';
import type { OrderQuantityError } from '../31_fp_smart_constructor/orderQuantityError';
import type { Eq } from './eq';
import { OrderQuantity } from './orderQuantity';
import { Product } from './product';

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

const build = (product: Product, quantity: OrderQuantity): OrderItem => ({
  product,
  quantity: OrderQuantity.build(quantity),
});

const safeBuild = (
  product: Product,
  quantity: OrderQuantity,
): Result<OrderItem, OrderQuantityError> =>
  OrderQuantity.safeBuild(quantity).map((orderQuantity) => OrderItem.build(product, orderQuantity));

const buildSingle = (product: Product): OrderItem => ({
  product,
  quantity: OrderQuantity.build(1),
});

const equals: Eq<OrderItem> = (x: OrderItem, y: OrderItem): boolean =>
  Product.isSameIdentity(x.product, y.product) && OrderQuantity.equals(x.quantity, y.quantity);

export const OrderItem = {
  equals,
  build,
  safeBuild,
  buildSingle,
  add,
  total: calculateTotal,
} as const;
