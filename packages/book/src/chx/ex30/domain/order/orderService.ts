import assert from 'node:assert';

import type { Item } from 'chx/ex10/domain/item/item.js';
import { Order } from 'chx/ex10/domain/order/order.js';
import { OrderId } from 'chx/ex10/domain/order/orderId.js';
import type { Product } from 'chx/ex10/domain/product/product.js';
import { ProductId } from 'chx/ex10/domain/product/productId.js';
import { Aggregate } from 'chx/ex30/domain/aggregate.js';
import { Cart } from 'chx/ex30/domain/cart/cart.js';
import type { CartClearedOnOrder } from 'chx/ex30/domain/cart/cartEvent.js';
import { DomainEvent } from 'chx/ex30/domain/domainEvent.js';
import { OrderRequested } from 'chx/ex30/domain/order/orderEvent.js';
import { pipe } from 'remeda';

const applyItems = (
  cart: Cart,
  products: ReadonlyArray<Product>,
): ReadonlyArray<Item> => {
  const { props } = cart;
  const items = props.items.reduce((acc, item) => {
    const maybeProduct = products.find((product) =>
      ProductId.equals(product.aggregateId, item.productId),
    );
    if (maybeProduct) {
      acc.push({
        productId: item.productId,
        quantity: item.quantity,
        price: maybeProduct.props.price,
      });
    }
    return acc;
  }, [] as Array<Item>);
  assert(props.items.length === items.length);
  return items;
};

export const OrderService = (
  cart: Cart,
  products: ReadonlyArray<Product>,
  generateOrderId = OrderId.generate,
): [Order, OrderRequested, Cart, CartClearedOnOrder] => {
  const order = {
    aggregateId: generateOrderId(),
    sequenceNumber: Aggregate.InitialSequenceNumber,
    props: {
      customerId: cart.aggregateId,
      items: applyItems(cart, products),
    },
  };
  const orderRequested = pipe(
    order,
    DomainEvent.generate(OrderRequested.name, Order.aggregateName, {
      customerId: order.props.customerId,
      items: order.props.items,
    }),
  );

  const [newCart, cartClearedOnOrder] = Cart.clearOnOrder(cart);
  return [order, orderRequested, newCart, cartClearedOnOrder];
};
