import assert from 'node:assert';
import { pipe } from 'remeda';
import type { Item } from '../../../10_zod/domain/item/item.js';
import { Order } from '../../../10_zod/domain/order/order.js';
import { OrderId } from '../../../10_zod/domain/order/orderId.js';
import type { Product } from '../../../10_zod/domain/product/product.js';
import { ProductId } from '../../../10_zod/domain/product/productId.js';
import { Aggregate } from '../aggregate.js';
import { Cart } from '../cart/cart.js';
import type { CartClearedOnOrder } from '../cart/cartEvent.js';
import { DomainEvent } from '../domainEvent.js';
import { OrderRequested } from './orderEvent.js';

const applyItems = (cart: Cart, products: ReadonlyArray<Product>): ReadonlyArray<Item> => {
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
