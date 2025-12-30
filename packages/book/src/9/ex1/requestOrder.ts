import assert from 'node:assert';

import * as R from 'remeda';

import { Cart } from './cart.js';
import type { CartCleared } from './cartEvent.js';
import type { CartItem } from './cartItem.js';
import { DomainEvent } from './domainEvent.js';
import { Order } from './order.js';
import { OrderRequested } from './orderEvent.js';
import { OrderId } from './orderId.js';
import type { Product } from './product.js';
import { ProductId } from './productId.js';

const assertExistsProduct = (
  cart: Cart,
  products: ReadonlyArray<Product>,
): void => {
  cart.cartItems.forEach((item) => {
    const maybeProduct = products.find((product) =>
      ProductId.equals(product.aggregateId, item.productId),
    );
    assert(maybeProduct !== undefined, `価格を適用する商品が見つかりません`);
  });
};

const applyPrice = (
  cart: Cart,
  products: ReadonlyArray<Product>,
): ReadonlyArray<CartItem> => {
  const { cartItems } = cart;
  return cartItems.reduce<Array<CartItem>>((acc, item) => {
    const maybeProduct = products.find((product) =>
      ProductId.equals(product.aggregateId, item.productId),
    );
    if (maybeProduct) {
      acc.push({
        productId: item.productId,
        quantity: item.quantity,
        price: maybeProduct.price,
      });
    }
    return acc;
  }, []);
};

// 1
const requestOrder = (
  cart: Cart,
  products: ReadonlyArray<Product>,
  generateOrderId = OrderId.generate,
): [Order, OrderRequested, Cart, CartCleared] => {
  // 2
  assertExistsProduct(cart, products);
  // 3
  const items = applyPrice(cart, products);
  // 4
  const order = Order.generate(cart.aggregateId, items, generateOrderId);
  // 5
  const orderRequested = R.pipe(
    order,
    DomainEvent.generate(Order.aggregateName, OrderRequested.eventName, {
      customerId: cart.aggregateId,
      items: order.items,
    }),
  );
  // 6
  const [newCart, cartClearedOnOrder] = R.pipe(cart, Cart.clear('OnOrder'));
  // 7
  return [order, orderRequested, newCart, cartClearedOnOrder];
};

export { requestOrder };
