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

const countItems = ({ cartItems }: Cart): number => cartItems.length;

const withinItemsLimit = (cart: Cart): boolean =>
  countItems(cart) <= ItemsLimit;

const calculateTotalQuantity = ({ cartItems }: Cart): number =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0);

const withinTotalQuantityLimit = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const calculateTotalPrice = ({ cartItems }: Cart): number =>
  cartItems.reduce((acc, item) => acc + CartItem.calculateTotal(item), 0);

const withinTotalPriceLimit = (cart: Cart): boolean =>
  calculateTotalPrice(cart) <= TotalPriceLimit;

const assertCart = (cart: Cart): void => {
  assert(
    withinItemsLimit(cart),
    `カート項目数上限 ${ItemsLimit} を上回っています`,
  );
  assert(
    withinTotalQuantityLimit(cart),
    `合計数量上限 ${TotalQuantityLimit} を上回っています`,
  );
  assert(
    withinTotalPriceLimit(cart),
    `合計金額上限 ${TotalPriceLimit} を上回っています`,
  );
};

const build = (
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

const initBuild = (aggregateId: CustomerId): Cart => build(aggregateId, []);

const addCartItem =
  (targetCartItem: CartItem) =>
  ({ aggregateId, cartItems }: Cart): Cart => {
    const updateTargetIndex = R.findIndex(cartItems, (cartItem) =>
      ProductId.equals(cartItem.productId, targetCartItem.productId),
    );

    if (updateTargetIndex === -1) {
      return build(aggregateId, [...cartItems, targetCartItem]);
    }

    const updated = cartItems.map((cartItem, index) =>
      updateTargetIndex === index
        ? R.pipe(
            cartItem,
            CartItem.add(targetCartItem.quantity, targetCartItem.price),
          )
        : cartItem,
    );
    return build(aggregateId, updated);
  };

const removeCartItem =
  (productId: ProductId) =>
  ({ aggregateId, cartItems }: Cart): Cart => {
    const removedCartItems = cartItems.filter(
      (cartItem) => !ProductId.equals(cartItem.productId, productId),
    );
    return build(aggregateId, removedCartItems);
  };

const clear = ({ aggregateId }: Cart): Cart => build(aggregateId, []);

const Cart = {
  initBuild,
  build,
  addCartItem,
  removeCartItem,
  clear,
} as const;

export { Cart };
