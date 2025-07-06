import assert from 'node:assert';

import type { Aggregate } from 'ch7/ex1/aggregate.js';
import type { Brand } from 'ch7/ex1/brand.js';
import { CartItem } from 'ch7/ex1/cartItem.js';
import type { CustomerId } from 'ch7/ex1/customerId.js';
import { ProductId } from 'ch7/ex1/productId.js';
import * as R from 'remeda';

interface CartNotBranded extends Aggregate<CustomerId> {
  readonly cartItems: ReadonlyArray<CartItem>;
}

type Cart = CartNotBranded & Brand<'Cart'>;

const ItemsLimit = 10;
const TotalQuantityLimit = 30;
const TotalPriceLimit = 100_000;

const countItems = (cart: Cart): number => {
  const { cartItems } = cart;
  return cartItems.length;
};

const withinItemsLimit = (cart: Cart): boolean =>
  countItems(cart) <= ItemsLimit;

const calculateTotalQuantity = (cart: Cart): number => {
  const { cartItems } = cart;
  return cartItems.reduce((acc, item) => acc + item.quantity, 0);
};

const withinTotalQuantityLimit = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const calculateTotalPrice = (cart: Cart): number => {
  const { cartItems } = cart;
  return cartItems.reduce(
    (acc, item) => acc + CartItem.calculateTotal(item),
    0,
  );
};

const withinTotalPriceLimit = (cart: Cart): boolean =>
  calculateTotalPrice(cart) <= TotalPriceLimit;

const assertCart = (cart: Cart): void => {
  assert(
    withinItemsLimit(cart),
    `カート項目数が ${ItemsLimit.toString()} を上回っています`,
  );
  assert(
    withinTotalQuantityLimit(cart),
    `総数が ${TotalQuantityLimit.toString()} を上回っています`,
  );
  assert(
    withinTotalPriceLimit(cart),
    `総額が ${TotalPriceLimit.toString()} を上回っています`,
  );
};

const create = (
  aggregateId: CustomerId,
  cartItems: ReadonlyArray<CartItem>,
): Cart => {
  const notBranded: CartNotBranded = {
    aggregateId,
    cartItems,
  };
  const cart = notBranded as Cart;
  assertCart(cart);
  return cart;
};

const init = (aggregateId: CustomerId): Cart => create(aggregateId, []);

const addCartItem =
  (targetCartItem: CartItem) =>
  (cart: Cart): Cart => {
    const { aggregateId, cartItems } = cart;
    const updateTargetIndex = R.findIndex(cartItems, (cartItem) =>
      ProductId.equals(cartItem.productId, targetCartItem.productId),
    );

    if (updateTargetIndex === -1) {
      return create(aggregateId, [...cartItems, targetCartItem]);
    }

    const updated = cartItems.map((cartItem, index) =>
      updateTargetIndex === index
        ? R.pipe(
            cartItem,
            CartItem.add(targetCartItem.quantity, targetCartItem.price),
          )
        : cartItem,
    );
    return create(aggregateId, updated);
  };

const removeCartItem =
  (productId: ProductId) =>
  (cart: Cart): Cart => {
    const { aggregateId, cartItems } = cart;
    const removedCartItems = cartItems.filter(
      (cartItem) => !ProductId.equals(cartItem.productId, productId),
    );
    return create(aggregateId, removedCartItems);
  };

const clear = (cart: Cart): Cart => {
  const { aggregateId } = cart;
  return create(aggregateId, []);
};

const Cart = {
  init,
  create,
  addCartItem,
  removeCartItem,
  clear,
} as const;

export { Cart };
