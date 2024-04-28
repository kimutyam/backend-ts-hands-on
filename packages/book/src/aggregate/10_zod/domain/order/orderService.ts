import assert from 'node:assert';
import { Cart } from '../cart/cart';
import type { Item } from '../cart/item';
import type { Product } from '../product/product';
import { ProductId } from '../product/productId';
import type { Order } from './order';
import type { OrderId } from './orderId';

const detectItems = (cart: Cart, products: ReadonlyArray<Product>) => {
  const items = cart.items.reduce((acc, item) => {
    const maybeProduct = products.find((product) =>
      ProductId.equals(product.productId, item.productId),
    );
    if (maybeProduct) {
      acc.push({
        productId: item.productId,
        quantity: item.quantity,
        price: maybeProduct.price,
      });
    }
    return acc;
  }, [] as Array<Item>);
  assert(cart.items.length === items.length);
  return items;
};

export const OrderService = (
  cart: Cart,
  products: ReadonlyArray<Product>,
  generateOrderId: () => OrderId,
): [Order, Cart] => {
  const order = {
    orderId: generateOrderId(),
    customerId: cart.customerId,
    items: detectItems(cart, products),
  };
  const initedCart = Cart.init(cart.customerId);
  return [order, initedCart];
};
