import type { Eq } from './eq';
import { OrderQuantity } from './orderQuantity';
import { Product } from './product';

export type OrderItem = Readonly<{
  product: Product;
  quantity: OrderQuantity;
}>;

const equals: Eq<OrderItem> = (x: OrderItem, y: OrderItem): boolean =>
  Product.equals(x.product, y.product) && OrderQuantity.equals(x.quantity, y.quantity);

export const OrderItem = {
  equals,
} as const;
