import assert from 'node:assert';
import { Cart } from '../cart/cart';
import type { OrderItem } from '../cart/orderItem';
import type { Product } from '../product/product';
import { ProductId } from '../product/productId';
import type { Order } from './order';
import type { OrderId } from './orderId';

export const OrderService = (
  cart: Cart,
  products: ReadonlyArray<Product>,
  generateOrderId: () => OrderId,
): [Order, Cart] => {
  const orderItems = cart.orderItems.reduce((acc, orderItem) => {
    const p = products.find((product) => ProductId.equals(product.productId, orderItem.productId));
    if (p) {
      acc.push({
        productId: orderItem.productId,
        orderQuantity: orderItem.orderQuantity,
        price: p.price,
      });
    }
    return acc;
  }, [] as Array<OrderItem>);

  assert(cart.orderItems.length === orderItems.length);

  const order = {
    orderId: generateOrderId(),
    customerId: cart.customerId,
    orderItems,
  };
  return [order, Cart.init(cart.customerId)];
};
