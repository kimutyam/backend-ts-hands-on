import assert from 'node:assert';
import { Cart } from '../cart/cart';
import type { Item } from '../cart/item';
import type { Product } from '../product/product';
import { ProductId } from '../product/productId';
import type { Order } from './order';
import type { OrderId } from './orderId';

const detectItems = (cart: Cart, products: ReadonlyArray<Product>) => {
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
): [Order, Cart] => {
  const order = {
    aggregateId: generateOrderId(),
    props: {
      customerId: cart.aggregateId,
      items: detectItems(cart, products),
    },
  };
  const initedCart = Cart.clear(cart);
  return [order, initedCart];
};
