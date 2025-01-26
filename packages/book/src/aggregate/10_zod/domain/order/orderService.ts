import assert from 'node:assert';
import { Cart } from '../cart/cart.js';
import type { Item } from '../item/item.js';
import type { Product } from '../product/product.js';
import { ProductId } from '../product/productId.js';
import type { Order } from './order.js';
import type { OrderId } from './orderId.js';

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
  const newCart = Cart.clearOnOrder(cart);
  return [order, newCart];
};
