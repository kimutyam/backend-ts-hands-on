import { reserveStock } from 'ch6/ex40/reserveStock.js';
import type { StockReservationError } from 'ch6/ex40/stockReservationError.js';
import type { Order, ProductStock } from 'ch6/ex40/types.js';
import { ResultAsync } from 'neverthrow';

declare function findOrder(orderId: string): Promise<Order>;
declare function findStocks(productId: ReadonlyArray<string>): Promise<ReadonlyArray<ProductStock>>;
declare function storeStocks(employee: ReadonlyArray<ProductStock>): Promise<void>;

const reserveStockOf = (
  order: Order,
): ResultAsync<ReadonlyArray<ProductStock>, StockReservationError> => {
  const productIds = order.items.map((item) => item.productId);
  return ResultAsync.fromSafePromise(findStocks(productIds)).andThen((stocks) =>
    reserveStock(order, stocks),
  );
};

const reserveStockBy = (orderId: string): ResultAsync<void, StockReservationError> =>
  ResultAsync.fromSafePromise(findOrder(orderId))
    .andThen((order) => reserveStockOf(order))
    .map((availableStocks) => storeStocks(availableStocks));

export { reserveStockBy };
