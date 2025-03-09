import assert from 'node:assert';
import type { Item } from 'aggregate/10_zod/domain/item/item.js';
import { Order } from 'aggregate/10_zod/domain/order/order.js';
import { OrderId } from 'aggregate/10_zod/domain/order/orderId.js';
import type { Product } from 'aggregate/10_zod/domain/product/product.js';
import { ProductId } from 'aggregate/10_zod/domain/product/productId.js';
import { Aggregate } from 'aggregate/30_domain_event/domain/aggregate.js';
import { Cart } from 'aggregate/30_domain_event/domain/cart/cart.js';
import type { CartClearedOnOrder } from 'aggregate/30_domain_event/domain/cart/cartEvent.js';
import { DomainEvent } from 'aggregate/30_domain_event/domain/domainEvent.js';
import { OrderRequested } from 'aggregate/30_domain_event/domain/order/orderEvent.js';
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
    DomainEvent.generate(
      OrderRequested.name,
      Order.aggregateName,
      {
        customerId: order.props.customerId,
        items: order.props.items,
      },
    ),
  );

  const [newCart, cartClearedOnOrder] =
    Cart.clearOnOrder(cart);
  return [
    order,
    orderRequested,
    newCart,
    cartClearedOnOrder,
  ];
};
