import assert from 'node:assert';
import { Cart } from '../cart/cart';
import type { OrderItem } from '../cart/orderItem';
import type { Product } from '../product/product';
import { ProductId } from '../product/productId';
import type { Order } from './order';
import type { OrderId } from './orderId';

const detectOrderItems = (cart: Cart, products: ReadonlyArray<Product>) => {
  const orderItems = cart.orderItems.reduce((acc, orderItem) => {
    const maybeProduct = products.find((product) =>
      ProductId.equals(product.productId, orderItem.productId),
    );
    if (maybeProduct) {
      acc.push({
        productId: orderItem.productId,
        orderQuantity: orderItem.orderQuantity,
        price: maybeProduct.price,
      });
    }
    return acc;
  }, [] as Array<OrderItem>);
  assert(cart.orderItems.length === orderItems.length);
  return orderItems;
};

export const OrderService = (
  cart: Cart,
  products: ReadonlyArray<Product>,
  generateOrderId: () => OrderId,
): [Order, Cart] => {
  const order = {
    orderId: generateOrderId(),
    customerId: cart.customerId,
    orderItems: detectOrderItems(cart, products),
  };
  const initedCart = Cart.init(cart.customerId);
  return [order, initedCart];
};
