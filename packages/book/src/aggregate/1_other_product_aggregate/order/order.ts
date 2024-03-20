import assert from 'assert';
import { err, ok, Result } from 'neverthrow';
import * as R from 'remeda';
import { ProductId } from '../product/productId';
import { OrderError } from './orderError';
import type { OrderId } from './orderId';
import { OrderItem } from './orderItem';
import type { OrderQuantityError } from './orderQuantityError';

export type Order = Readonly<{
  orderId: OrderId;
  orderItems: ReadonlyArray<OrderItem>;
}>;

const TotalQuantityLimit = 30;

const calculateTotalQuantity = (orderItems: ReadonlyArray<OrderItem>): number =>
  orderItems.reduce((acc, oi) => acc + oi.quantity, 0);

const withinTotalQuantity = (orderItems: ReadonlyArray<OrderItem>): boolean =>
  calculateTotalQuantity(orderItems) <= TotalQuantityLimit;

const TotalPriceLimit = 100_000;

const calculateTotalPrice = (orderItems: ReadonlyArray<OrderItem>): number =>
  orderItems.reduce((acc, oi) => acc + OrderItem.calculateTotal(oi), 0);

const withinTotalPrice = (orderItems: ReadonlyArray<OrderItem>): boolean =>
  calculateTotalPrice(orderItems) <= TotalPriceLimit;

export const uniqueByProduct = (orderItems: ReadonlyArray<OrderItem>): ReadonlyArray<OrderItem> =>
  R.pipe(
    orderItems,
    R.uniqBy((oi) => oi.productId),
  );

const isUniqueOrderItems = (orderItems: ReadonlyArray<OrderItem>): boolean =>
  uniqueByProduct(orderItems).length === orderItems.length;

const validate = ({ orderItems }: Order): Array<string> => {
  const issues: Array<string> = [];
  if (!withinTotalQuantity(orderItems)) {
    issues.push(`注文数上限 ${TotalQuantityLimit} を上回っています`);
  }

  if (!isUniqueOrderItems(orderItems)) {
    issues.push(`注文品目の商品が重複しています`);
  }

  if (!withinTotalPrice(orderItems)) {
    issues.push(`購入金額上限 ${TotalPriceLimit} を上回っています`);
  }
  return issues;
};

const build = (orderId: OrderId, orderItems: ReadonlyArray<OrderItem>): Order => {
  const order = { orderId, orderItems };
  let issues: Array<string>;
  assert((issues = validate(order)).length === 0, issues.join('\n'));
  return order;
};

const safeBuild = (
  orderId: OrderId,
  orderItems: ReadonlyArray<OrderItem>,
): Result<Order, OrderError> => {
  const order = { orderId, orderItems };
  const issues = validate(order);
  return issues.length ? err(OrderError.build(issues)) : ok(order);
};

// ルートから実行することで、不変条件を満たすための某。
// NOTE: 品目の追加に失敗と、注文の制約に失敗は切り分けることとする
const addOrderItem =
  ({ productId, quantity }: OrderItem) =>
  ({ orderId, orderItems }: Order): Result<Order, OrderQuantityError | OrderError> =>
    Result.combine(
      // 重複させない仕組み & 品目10個制限
      orderItems.map((orderItem) =>
        ProductId.equals(orderItem.productId, productId)
          ? OrderItem.add(quantity)(orderItem)
          : ok(orderItem),
      ),
    ).andThen((orderItem) => safeBuild(orderId, orderItem));

export const Order = {
  addOrderItem,
  build,
  safeBuild,
} as const;
