import assert from 'node:assert';
import * as R from 'remeda';
import { pipe } from 'remeda';
import { Aggregate } from './aggregate.js';
import type { Brand } from './brand.js';
import type { CartClearReason } from './cartClearReason.js';
import { CartCleared, CartItemAdded, CartItemRemoved, CartItemUpdated } from './cartEvent.js';
import { CartItem } from './cartItem.js';
import type { CustomerId } from './customerId.js';
import { DomainEvent } from './domainEvent.js';
import { ProductId } from './productId.js';

const name = 'Cart';

interface CartNotBranded extends Aggregate<CustomerId> {
  readonly cartItems: ReadonlyArray<CartItem>;
}

type Cart = CartNotBranded & Brand<typeof name>;

const ItemsLimit = 10;
const TotalQuantityLimit = 30;
const TotalPriceLimit = 100_000;

const countItems = ({ cartItems }: Cart): number => cartItems.length;

const withinItemsLimit = (cart: Cart): boolean => countItems(cart) <= ItemsLimit;

const calculateTotalQuantity = ({ cartItems }: Cart): number =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0);

const withinTotalQuantityLimit = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const calculateTotalPrice = ({ cartItems }: Cart): number =>
  cartItems.reduce((acc, item) => acc + CartItem.calculateTotal(item), 0);

const withinTotalPriceLimit = (cart: Cart): boolean => calculateTotalPrice(cart) <= TotalPriceLimit;

const assertCart = (cart: Cart): void => {
  assert(withinItemsLimit(cart), `品目数上限 ${ItemsLimit} を上回っています`);
  assert(withinTotalQuantityLimit(cart), `合計数量上限 ${TotalQuantityLimit} を上回っています`);
  assert(withinTotalPriceLimit(cart), `合計金額上限 ${TotalPriceLimit} を上回っています`);
};

const build = (
  aggregateId: CustomerId,
  sequenceNumber: number,
  cartItems: ReadonlyArray<CartItem>,
): Cart => {
  const notBranded: CartNotBranded = {
    aggregateId,
    sequenceNumber,
    cartItems,
  };
  const cart = notBranded as Cart;
  assertCart(cart);
  return cart;
};

const initBuild = (aggregateId: CustomerId): Cart =>
  build(aggregateId, Aggregate.InitialSequenceNumber, []);

const addCartItem =
  (targetCartItem: CartItem) =>
  ({ aggregateId, sequenceNumber, cartItems }: Cart): [Cart, CartItemAdded | CartItemUpdated] => {
    const updateTargetIndex = R.findIndex(cartItems, (cartItem) =>
      ProductId.equals(cartItem.productId, targetCartItem.productId),
    );

    if (updateTargetIndex === -1) {
      const aggregate = build(aggregateId, Aggregate.incrementSequenceNumber(sequenceNumber), [
        ...cartItems,
        targetCartItem,
      ]);
      const event = pipe(
        aggregate,
        DomainEvent.generate(name, CartItemAdded.eventName, { cartItem: targetCartItem }),
      );
      return [aggregate, event];
    }

    const updated = cartItems.map((cartItem) =>
      ProductId.equals(cartItem.productId, targetCartItem.productId)
        ? R.pipe(cartItem, CartItem.add(targetCartItem.quantity, targetCartItem.price))
        : cartItem,
    );
    const aggregate = build(
      aggregateId,
      Aggregate.incrementSequenceNumber(sequenceNumber),
      updated,
    );

    const event = R.pipe(
      aggregate,
      DomainEvent.generate(name, CartItemUpdated.eventName, {
        cartItem: aggregate.cartItems[updateTargetIndex]!,
      }),
    );
    return [aggregate, event];
  };

const removeCartItem =
  (productId: ProductId) =>
  ({ aggregateId, sequenceNumber, cartItems }: Cart): [Cart, CartItemRemoved] => {
    const removedCartItems = cartItems.filter(
      (cartItem) => !ProductId.equals(cartItem.productId, productId),
    );
    const aggregate = build(
      aggregateId,
      Aggregate.incrementSequenceNumber(sequenceNumber),
      removedCartItems,
    );
    const event = pipe(
      aggregate,
      DomainEvent.generate(name, CartItemRemoved.eventName, { productId }),
    );
    return [aggregate, event];
  };

const clear =
  (reason: CartClearReason) =>
  ({ aggregateId, sequenceNumber }: Cart): [Cart, CartCleared] => {
    const aggregate = build(aggregateId, Aggregate.incrementSequenceNumber(sequenceNumber), []);
    const event = pipe(
      aggregate,
      DomainEvent.generate(name, CartCleared.eventName, { aggregateId, reason }),
    );
    return [aggregate, event];
  };

const Cart = {
  name,
  initBuild,
  build,
  addCartItem,
  removeCartItem,
  clear,
} as const;

export { Cart };
