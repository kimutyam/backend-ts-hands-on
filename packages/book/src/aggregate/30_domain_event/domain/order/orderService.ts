import assert from 'node:assert';
import { pipe } from 'remeda';
import type { Item } from '../../../10_zod/domain/item/item';
import { Order } from '../../../10_zod/domain/order/order';
import type { OrderId } from '../../../10_zod/domain/order/orderId';
import type { Product } from '../../../10_zod/domain/product/product';
import { ProductId } from '../../../10_zod/domain/product/productId';
import { Aggregate } from '../aggregate';
import { Cart } from '../cart/cart';
import type { CartClearedOnOrder } from '../cart/cartEvent';
import { DomainEvent } from '../domainEvent';
import { OrderRequested } from './orderEvent';

const detectItems = (cart: Cart, products: ReadonlyArray<Product>): ReadonlyArray<Item> => {
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
  generateOrderId: () => OrderId,
): [Order, OrderRequested, Cart, CartClearedOnOrder] => {
  const order = {
    aggregateId: generateOrderId(),
    sequenceNumber: Aggregate.InitialSequenceNumber,
    props: {
      customerId: cart.aggregateId,
      items: detectItems(cart, products),
    },
  };
  const orderRequested = pipe(
    order,
    DomainEvent.generate(OrderRequested.name, Order.name, {
      customerId: order.props.customerId,
      items: order.props.items,
    }),
  );

  const [newCart, cartClearedOnOrder] = Cart.clearOnOrder(cart);
  return [order, orderRequested, newCart, cartClearedOnOrder];
};
