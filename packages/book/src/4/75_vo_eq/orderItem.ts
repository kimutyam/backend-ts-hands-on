import type { Eq } from './eq';
import { OrderQuantity } from './orderQuantity';
import { Product } from './product';

export type OrderItem = Readonly<{
  product: Product;
  quantity: OrderQuantity;
}>;

const add =
  (quantity: OrderQuantity) =>
  (orderItem: OrderItem): OrderItem => ({
    ...orderItem,
    quantity: OrderQuantity.build(orderItem.quantity.value + quantity.value),
  });

const calculateTotal = ({ product, quantity }: OrderItem): number => product.price * quantity.value;

const build = (product: Product, quantity: OrderQuantity): OrderItem => ({
  product,
  quantity,
});

const buildSingle = (product: Product): OrderItem => ({
  product,
  quantity: OrderQuantity.build(1),
});

const equals: Eq<OrderItem> = (x: OrderItem, y: OrderItem): boolean =>
  Product.equals(x.product, y.product) && OrderQuantity.equals(x.quantity, y.quantity);

export const OrderItem = {
  build,
  buildSingle,
  add,
  total: calculateTotal,
  equals,
} as const;
