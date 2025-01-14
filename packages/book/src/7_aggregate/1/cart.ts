import assert from 'node:assert';
import type { Aggregate } from './aggregate';
import type { Brand } from './brand';
import { CartItem } from './cartItem';
import type { CustomerId } from './customerId';
import { ProductId } from './productId';
import type { Quantity } from './quantity';

interface CartNotBranded extends Aggregate<CustomerId> {
  readonly cartItems: ReadonlyArray<CartItem>;
}

type Cart = CartNotBranded & Brand<'Cart'>;

const ItemsLimit = 10;
const TotalQuantityLimit = 30;

const countItems = ({ cartItems }: Cart): number => cartItems.length;

const withinItemsLimit = (cart: Cart): boolean => countItems(cart) <= ItemsLimit;

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

const build = (aggregateId: CustomerId, cartItems: ReadonlyArray<CartItem>): Cart => {
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
    const addedCartItems = cartItems.map((cartItem) =>
      ProductId.equals(cartItem.productId, targetCartItem.productId)
        ? CartItem.add(targetCartItem.quantity)(cartItem)
        : cartItem,
    );
    return build(aggregateId, addedCartItems);
  };

const removeCartItem =
  (productId: ProductId) =>
  ({ aggregateId, cartItems }: Cart): Cart => {
    const removedCartItems = cartItems.filter(
      (cartItem) => !ProductId.equals(cartItem.productId, productId),
    );
    return build(aggregateId, removedCartItems);
  };

const updateItemQuantity =
  (productId: ProductId, quantity: Quantity) =>
  ({ aggregateId, cartItems }: Cart): Cart => {
    const updatedCartItems = cartItems.map((cartItem) =>
      ProductId.equals(cartItem.productId, productId)
        ? { productId, quantity, price: cartItem.price }
        : cartItem,
    );
    return build(aggregateId, updatedCartItems);
  };

const clear = ({ aggregateId }: Cart): Cart => build(aggregateId, []);

const Cart = {
  initBuild,
  build,
  clear,
  addCartItem,
  removeCartItem,
  updateItemQuantity,
} as const;

export { Cart };
