import { StockReservationError } from 'ch6/ex40/stockReservationError.js';
import type { Order, Stocks } from 'ch6/ex40/types.js';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

/**
 * 在庫引当サービス
 *
 * @param order 注文
 * @param stocks 総在庫
 * @returns 有効在庫
 * */
const reserveStock = (
  order: Order,
  stocks: Stocks,
): Result<Stocks, StockReservationError> => {
  // 注文の商品ごとの在庫引当計画を作成
  const plans = order.items.map(({ productId, quantity }) => {
    const maybeProductStock = stocks.find((s) => s.productId === productId);
    const currentStock = maybeProductStock?.stock || 0;
    return {
      productId,
      stockDiff: currentStock - quantity,
    };
  });

  // 在庫が足りない商品の在庫引当計画を取得
  const outOfStocks = plans
    .filter((updatedProductStock) => updatedProductStock.stockDiff < 0)
    .map(({ productId, stockDiff }) => ({
      productId,
      shortage: Math.abs(stockDiff),
    }));

  // 在庫が足りない商品がなければ在庫引当計画を返す
  if (outOfStocks.length === 0) {
    return ok(
      plans.map(({ productId, stockDiff }) => ({
        productId,
        stock: stockDiff,
      })),
    );
  }
  // 在庫が足りない商品があればエラーを返す
  return err(new StockReservationError(order.orderId, outOfStocks));
};

export { reserveStock };
