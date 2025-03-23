import assert from 'node:assert';

import { Cart } from 'ch9/ex50/cart.js';
import type { CartCleared } from 'ch9/ex50/cartEvent.js';
import type { CartItem } from 'ch9/ex50/cartItem.js';
import { DomainEvent } from 'ch9/ex50/domainEvent.js';
import { Order } from 'ch9/ex50/order.js';
import { OrderRequested } from 'ch9/ex50/orderEvent.js';
import { OrderId } from 'ch9/ex50/orderId.js';
import type { Product } from 'ch9/ex50/product.js';
import { ProductId } from 'ch9/ex50/productId.js';
import { pipe } from 'remeda';

const applyPrice = (
  { cartItems }: Cart,
  products: ReadonlyArray<Product>,
): ReadonlyArray<CartItem> =>
  cartItems.reduce<Array<CartItem>>((acc, item) => {
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

const requestOrder = (
  cart: Cart,
  products: ReadonlyArray<Product>,
  generateOrderId = OrderId.generate,
): [Order, OrderRequested, Cart, CartCleared] => {
  assertExistsProduct(cart, products);
  const items = applyPrice(cart, products);
  const order = Order.generate(cart.aggregateId, items, generateOrderId);
  const orderRequested = pipe(
    order,
    DomainEvent.generate(Order.name, OrderRequested.eventName, {
      customerId: cart.aggregateId,
      items: order.items,
    }),
  );
  const [newCart, cartClearedOnOrder] = pipe(cart, Cart.clear('OnOrder'));
  return [order, orderRequested, newCart, cartClearedOnOrder];
};

export { requestOrder };
