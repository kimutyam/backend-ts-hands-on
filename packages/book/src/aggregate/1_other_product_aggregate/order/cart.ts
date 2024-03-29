import assert from 'assert';
import { err, ok, Result } from 'neverthrow';
import * as R from 'remeda';
import { ProductId } from '../product/productId';
import type { CartError } from './cartError';
import { CartLimitError } from './cartLimitError';
import type { Order } from './order';
import type { OrderId } from './orderId';
import { OrderItem } from './orderItem';
import type { OrderQuantity } from './orderQuantity';
import { TotalPriceLimitError } from './totalPriceLimitError';
import { TotalQuantityLimitError } from './totalQuantityLimitError';

export type Cart = {
  customerId: CustomerId;
  orderItems: ReadonlyArray<OrderItem>;
};

const CartLimit = 10;

const countOrderItems = ({ orderItems }: Cart): number => orderItems.length;

const withinCartLimit = (cart: Cart): boolean => countOrderItems(cart) <= CartLimit;

const TotalQuantityLimit = 30;

const calculateTotalQuantity = ({ orderItems }: Cart): number =>
  orderItems.reduce((acc, oi) => acc + oi.quantity, 0);

const withinTotalQuantity = (cart: Cart): boolean =>
  calculateTotalQuantity(cart) <= TotalQuantityLimit;

const TotalPriceLimit = 100_000;

const calculateTotalPrice = ({ orderItems }: Cart): number =>
  orderItems.reduce((acc, oi) => acc + OrderItem.calculateTotal(oi), 0);

const withinTotalPrice = (cart: Cart): boolean => calculateTotalPrice(cart) <= TotalPriceLimit;

export const uniqueByProduct = ({ customerId, orderItems }: Cart): Cart => {
  const uniqueOrderItems = R.pipe(
    orderItems,
    R.uniqBy((oi) => oi.productId),
  );
  return { customerId, orderItems: uniqueOrderItems };
};

// const isUniqueOrderItems = (cart: Cart): boolean =>
//   uniqueByProduct(cart).length === cart.orderItems.length;

const validate = (cart: Cart): ReadonlyArray<CartError> => {
  const issues: Array<CartError> = [];
  if (!withinCartLimit(cart)) {
    issues.push(new CartLimitError(`カート上限 ${CartLimit} を上回っています`));
  }

  if (!withinTotalQuantity(cart)) {
    issues.push(new TotalQuantityLimitError(`注文数上限 ${TotalQuantityLimit} を上回っています`));
  }

  if (!withinTotalPrice(cart)) {
    issues.push(new TotalPriceLimitError(`購入金額上限 ${TotalPriceLimit} を上回っています`));
  }
  return issues;
};

const init = (customerId: CustomerId): Cart => ({
  customerId,
  orderItems: [],
});

const build = (customerId: CustomerId, orderItems: ReadonlyArray<OrderItem>): Cart => {
  const cart = uniqueByProduct({ customerId, orderItems });
  let issues: ReadonlyArray<CartError>;
  assert((issues = validate(cart)).length === 0, issues.join('\n'));
  return cart;
};

const safeBuild = (
  customerId: CustomerId,
  orderItems: ReadonlyArray<OrderItem>,
): Result<Cart, ReadonlyArray<CartError>> => {
  const cart = uniqueByProduct({ customerId, orderItems });
  const issues = validate(cart);
  return issues.length ? err(issues) : ok(cart);
};

// ルートから実行することで、不変条件を満たすための某。
const addProduct =
  (productId: ProductId) =>
  (cart: Cart): Result<Cart, ReadonlyArray<CartError>> =>
    Result.combine(
      cart.orderItems.map((orderItem) =>
        ProductId.equals(orderItem.productId, productId)
          ? OrderItem.add(1)(orderItem)
          : ok(orderItem),
      ),
    )
      .mapErr((a) => [a])
      .andThen((orderItems) => safeBuild(cart.customerId, orderItems));

const removeProduct =
  (productId: ProductId) =>
  (cart: Cart): Cart => {
    const orderItems = cart.orderItems.filter((orderItem) => orderItem.productId !== productId);
    return build(cart.customerId, orderItems);
  };

const updateQuantity =
  (productId: ProductId, quantity: OrderQuantity) =>
  (cart: Cart): Result<Cart, ReadonlyArray<CartError>> => {
    const orderItems = cart.orderItems.map((orderItem) =>
      ProductId.equals(orderItem.productId, productId)
        ? { productId, price: orderItem.price, quantity }
        : orderItem,
    );
    return safeBuild(cart.customerId, orderItems);
  };

const submitOrder =
  (generateOrderId: () => OrderId) =>
  ({ customerId, orderItems }: Cart): [Order, Cart] => {
    const order = {
      orderId: generateOrderId(),
      customerId,
      orderItems,
    };
    const cart = init(customerId);
    return [order, cart];
  };

export const Cart = {
  countOrderItems,
  addProduct,
  removeProduct,
  updateQuantity,
  submitOrder,
} as const;
