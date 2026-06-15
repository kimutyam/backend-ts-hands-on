import assert from 'node:assert';

import * as R from 'remeda';

import { Cart } from '#/app/domain/cart/cart.js';
import type { CartCleared } from '#/app/domain/cart/cartEvent.js';
import type { CartItem } from '#/app/domain/cart/cartItem.js';
import { Order } from '#/app/domain/order/order.js';
import type { OrderRequested } from '#/app/domain/order/orderEvent.js';
import { OrderId } from '#/app/domain/order/orderId.js';
import type { Product } from '#/app/domain/product/product.js';
import { ProductId } from '#/app/domain/product/productId.js';

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

const requestOrder = (
  cart: Cart,
  products: ReadonlyArray<Product>,
  generateOrderId = OrderId.generate,
): [Order, OrderRequested, Cart, CartCleared] => {
  assertExistsProduct(cart, products);
  const items = applyPrice(cart, products);
  const [order, orderRequested] = R.pipe(
    Order.generate(cart.aggregateId, items, generateOrderId),
    Order.request,
  );
  const [newCart, cartClearedOnOrder] = R.pipe(cart, Cart.clear('OnOrder'));
  return [order, orderRequested, newCart, cartClearedOnOrder];
};

export { requestOrder };
