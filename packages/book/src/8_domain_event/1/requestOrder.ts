import assert from 'node:assert';
import { Cart } from '8_domain_event/1/cart.js';
import type { CartCleared } from '8_domain_event/1/cartEvent.js';
import type { CartItem } from '8_domain_event/1/cartItem.js';
import { DomainEvent } from '8_domain_event/1/domainEvent.js';
import { Order } from '8_domain_event/1/order.js';
import { OrderRequested } from '8_domain_event/1/orderEvent.js';
import { OrderId } from '8_domain_event/1/orderId.js';
import type { Product } from '8_domain_event/1/product.js';
import { ProductId } from '8_domain_event/1/productId.js';
import { pipe } from 'remeda';

const applyPrice = (
  { cartItems }: Cart,
  products: ReadonlyArray<Product>,
): ReadonlyArray<CartItem> =>
  cartItems.reduce((acc, item) => {
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
  }, [] as Array<CartItem>);

const assertExistsProduct = (
  cart: Cart,
  products: ReadonlyArray<Product>,
): void => {
  cart.cartItems.forEach((item) => {
    const maybeProduct = products.find((product) =>
      ProductId.equals(product.aggregateId, item.productId),
    );
    assert(
      maybeProduct !== undefined,
      `価格を適用する商品が見つかりません`,
    );
  });
};

const requestOrder = (
  cart: Cart,
  products: ReadonlyArray<Product>,
  generateOrderId = OrderId.generate,
): [Order, OrderRequested, Cart, CartCleared] => {
  assertExistsProduct(cart, products);
  const items = applyPrice(cart, products);
  const order = Order.generate(
    cart.aggregateId,
    items,
    generateOrderId,
  );
  const orderRequested = pipe(
    order,
    DomainEvent.generate(
      Order.name,
      OrderRequested.eventName,
      {
        customerId: cart.aggregateId,
        items: order.items,
      },
    ),
  );
  const [newCart, cartClearedOnOrder] = pipe(
    cart,
    Cart.clear('OnOrder'),
  );
  return [
    order,
    orderRequested,
    newCart,
    cartClearedOnOrder,
  ];
};

export { requestOrder };
