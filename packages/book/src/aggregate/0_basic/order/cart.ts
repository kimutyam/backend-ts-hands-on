import assert from 'assert';
import { err, ok, Result } from 'neverthrow';
import * as R from 'remeda';
import { Product } from '../product/product';
import type { ProductId } from '../product/productId';
import { CartError } from './cartError';
import type { Order } from './order';
import type { OrderId } from './orderId';
import { OrderItem } from './orderItem';
import type { OrderQuantity } from './orderQuantity';

export type Cart = {
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

export const uniqueByProduct = ({ orderItems }: Cart): ReadonlyArray<OrderItem> =>
  R.pipe(
    orderItems,
    R.uniqBy((oi) => oi.product.productId),
  );

const isUniqueOrderItems = (cart: Cart): boolean =>
  uniqueByProduct(cart).length === cart.orderItems.length;

const validate = (cart: Cart): Array<string> => {
  const issues: Array<string> = [];
  if (!withinCartLimit(cart)) {
    issues.push(`カート上限 ${CartLimit} を上回っています`);
  }

  if (!withinTotalQuantity(cart)) {
    issues.push(`注文数上限 ${TotalQuantityLimit} を上回っています`);
  }

  if (!isUniqueOrderItems(cart)) {
    issues.push(`注文品目の商品が重複しています`);
  }

  if (!withinTotalPrice(cart)) {
    issues.push(`購入金額上限 ${TotalPriceLimit} を上回っています`);
  }
  return issues;
};

const init = (): Cart => ({
  orderItems: [],
});

const build = (orderItems: ReadonlyArray<OrderItem>): Cart => {
  const cart = { orderItems };
  let issues: Array<string>;
  assert((issues = validate(cart)).length === 0, issues.join('\n'));
  return cart;
};

const safeBuild = (orderItems: ReadonlyArray<OrderItem>): Result<Cart, CartError> => {
  const cart = { orderItems };
  const issues = validate(cart);
  return issues.length ? err(CartError.build(issues)) : ok(cart);
};

// ルートから実行することで、不変条件を満たすための某。
// NOTE: 品目の追加に失敗と、注文の制約に失敗は切り分けることとする
const addProduct =
  (product: Product) =>
  (cart: Cart): Result<Cart, CartError | OrderQuantity> => {
    const targetOrderItem = OrderItem.buildSingle(product);
    return Result.combine(
      cart.orderItems.map((orderItem) =>
        Product.isSameIdentity(orderItem.product, product)
          ? OrderItem.add(targetOrderItem.quantity)(orderItem)
          : ok(orderItem),
      ),
    ).andThen((orderItems) => safeBuild(orderItems));
  };

const removeProduct =
  (productId: ProductId) =>
  (cart: Cart): Cart => {
    const orderItems = cart.orderItems.filter(
      (orderItem) => orderItem.product.productId !== productId,
    );
    return build(orderItems);
  };

const updateQuantity =
  (product: Product, quantity: OrderQuantity) =>
  (cart: Cart): Result<Cart, CartError> => {
    const orderItems = cart.orderItems.map((orderItem) =>
      Product.isSameIdentity(orderItem.product, product) ? { product, quantity } : orderItem,
    );
    return safeBuild(orderItems);
  };

const submitOrder =
  (generateOrderId: () => OrderId) =>
  ({ orderItems }: Cart): [Order, Cart] => {
    const order = {
      orderId: generateOrderId(),
      orderItems,
    };
    const cart = init();
    return [order, cart];
  };

export const Cart = {
  init,
  addProduct,
  countOrderItems,
  removeProduct,
  updateQuantity,
  submitOrder,
} as const;
