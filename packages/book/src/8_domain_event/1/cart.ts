import assert from 'node:assert';
import { pipe } from 'remeda';
import { Aggregate } from './aggregate';
import type { Brand } from './brand';
import {
  CartClearedOnOrder,
  CartItemAdded,
  CartItemQuantityUpdated,
  CartItemRemoved,
} from './cartEvent';
import { CartItem } from './cartItem';
import type { CustomerId } from './customerId';
import { DomainEvent } from './domainEvent';
import { ProductId } from './productId';
import type { Quantity } from './quantity';

const aggregateName = 'Cart';

interface CartNotBranded extends Aggregate<CustomerId, typeof aggregateName> {
  readonly cartItems: ReadonlyArray<CartItem>;
}

type Cart = CartNotBranded & Brand<typeof aggregateName>;

const ItemsLimit = 10;

const countItems = ({ cartItems }: Cart): number => cartItems.length;

const withinItemsLimit = (cart: Cart): boolean => countItems(cart) <= ItemsLimit;

const TotalQuantityLimit = 30;

const calculateTotalQuantity = ({ cartItems }: Cart): number =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0);

const withinTotalQuantityLimit = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const TotalPriceLimit = 100_000;

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
    aggregateName,
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
  ({ aggregateId, sequenceNumber, cartItems }: Cart): [Cart, CartItemAdded] => {
    const addedCartItems = cartItems.map((cartItem) =>
      ProductId.equals(cartItem.productId, targetCartItem.productId)
        ? CartItem.add(targetCartItem.quantity)(cartItem)
        : cartItem,
    );
    const aggregate = build(
      aggregateId,
      Aggregate.incrementSequenceNumber(sequenceNumber),
      addedCartItems,
    );
    const event = pipe(
      aggregate,
      DomainEvent.generate(CartItemAdded.name, { cartItem: targetCartItem }),
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
    const event = pipe(aggregate, DomainEvent.generate(CartItemRemoved.name, { productId }));
    return [aggregate, event];
  };

const updateItemQuantity =
  (productId: ProductId, quantity: Quantity) =>
  ({ aggregateId, sequenceNumber, cartItems }: Cart): [Cart, CartItemQuantityUpdated] => {
    const updatedCartItems = cartItems.map((cartItem) =>
      ProductId.equals(cartItem.productId, productId)
        ? { productId, quantity, price: cartItem.price }
        : cartItem,
    );
    const aggregate = build(
      aggregateId,
      Aggregate.incrementSequenceNumber(sequenceNumber),
      updatedCartItems,
    );
    const event = pipe(
      aggregate,
      DomainEvent.generate(CartItemQuantityUpdated.name, { productId, quantity }),
    );
    return [aggregate, event];
  };

const clearOnOrder = ({ aggregateId, sequenceNumber }: Cart): [Cart, CartClearedOnOrder] => {
  const aggregate = build(aggregateId, Aggregate.incrementSequenceNumber(sequenceNumber), []);
  const event = pipe(aggregate, DomainEvent.generate(CartClearedOnOrder.name, undefined));
  return [aggregate, event];
};

const Cart = {
  initBuild,
  build,
  clearOnOrder,
  addCartItem,
  removeCartItem,
  updateItemQuantity,
} as const;

export { Cart };
