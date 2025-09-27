import { StockReservationError } from 'ch6/ex6231/stockReservationError.js';
import type { Order, Stocks } from 'ch6/ex6231/types.js';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

const reserveStock = (
  order: Order,
  stocks: Stocks,
): Result<Stocks, StockReservationError> => {
  // 1
  const plans = order.items.map(({ productId, quantity }) => {
    const maybeProductStock = stocks.find((s) => s.productId === productId);
    const currentStock = maybeProductStock?.stock || 0;
    return {
      productId,
      stockDiff: currentStock - quantity,
    };
  });

  // 2
  const outOfStocks = plans
    .filter((updatedProductStock) => updatedProductStock.stockDiff < 0)
    .map(({ productId, stockDiff }) => ({
      productId,
      shortage: Math.abs(stockDiff),
    }));

  // 3
  if (outOfStocks.length === 0) {
    return ok(
      plans.map(({ productId, stockDiff }) => ({
        productId,
        stock: stockDiff,
      })),
    );
  }
  // 4
  return err(StockReservationError.create(order.orderId, outOfStocks));
};

export { reserveStock };
