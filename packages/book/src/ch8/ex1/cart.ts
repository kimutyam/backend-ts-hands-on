import assert from 'node:assert';

import * as R from 'remeda';

import { Aggregate } from './aggregate.js';
import type { Brand } from './brand.js';
import type { CartClearReason } from './cartClearReason.js';
import {
  CartCleared,
  CartItemAdded,
  CartItemRemoved,
  CartItemUpdated,
} from './cartEvent.js';
import { CartItem } from './cartItem.js';
import type { CustomerId } from './customerId.js';
import { DomainEvent } from './domainEvent.js';
import { ProductId } from './productId.js';

const aggregateName = 'Cart';

interface CartNotBranded extends Aggregate<CustomerId> {
  readonly cartItems: ReadonlyArray<CartItem>;
}

type Cart = CartNotBranded & Brand<typeof aggregateName>;

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

const init = (aggregateId: CustomerId): Cart =>
  create(aggregateId, Aggregate.InitialSequenceNumber, []);

const addCartItem =
  (targetCartItem: CartItem) =>
  (cart: Cart): [Cart, CartItemAdded | CartItemUpdated] => {
    const { aggregateId, sequenceNumber, cartItems } = cart;
    const updateTargetIndex = R.findIndex(cartItems, (cartItem) =>
      ProductId.equals(cartItem.productId, targetCartItem.productId),
    );

    if (updateTargetIndex === -1) {
      const aggregate = create(
        aggregateId,
        Aggregate.incrementSequenceNumber(sequenceNumber),
        [...cartItems, targetCartItem],
      );
      const event = R.pipe(
        aggregate,
        DomainEvent.generate(aggregateName, CartItemAdded.eventName, {
          cartItem: targetCartItem,
        }),
      );
      return [aggregate, event];
    }

    const updated = cartItems.map((cartItem) =>
      ProductId.equals(cartItem.productId, targetCartItem.productId)
        ? R.pipe(
            cartItem,
            CartItem.add(targetCartItem.quantity, targetCartItem.price),
          )
        : cartItem,
    );
    const aggregate = create(
      aggregateId,
      Aggregate.incrementSequenceNumber(sequenceNumber),
      updated,
    );

    const event = R.pipe(
      aggregate,
      DomainEvent.generate(aggregateName, CartItemUpdated.eventName, {
        cartItem: aggregate.cartItems[updateTargetIndex]!,
      }),
    );
    return [aggregate, event];
  };

const removeCartItem =
  (productId: ProductId) =>
  (cart: Cart): [Cart, CartItemRemoved] => {
    const { aggregateId, sequenceNumber, cartItems } = cart;
    const removedCartItems = cartItems.filter(
      (cartItem) => !ProductId.equals(cartItem.productId, productId),
    );
    const aggregate = create(
      aggregateId,
      Aggregate.incrementSequenceNumber(sequenceNumber),
      removedCartItems,
    );
    const event = R.pipe(
      aggregate,
      DomainEvent.generate(aggregateName, CartItemRemoved.eventName, {
        productId,
      }),
    );
    return [aggregate, event];
  };

const clear =
  (reason: CartClearReason) =>
  (cart: Cart): [Cart, CartCleared] => {
    const { aggregateId, sequenceNumber } = cart;
    const aggregate = create(
      aggregateId,
      Aggregate.incrementSequenceNumber(sequenceNumber),
      [],
    );
    const event = R.pipe(
      aggregate,
      DomainEvent.generate(aggregateName, CartCleared.eventName, {
        aggregateId,
        reason,
      }),
    );
    return [aggregate, event];
  };

const Cart = {
  aggregateName,
  init,
  create,
  addCartItem,
  removeCartItem,
  clear,
} as const;

export { Cart };
