import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import type { Order } from './order.js';
import type { ProductStock } from './productStock.js';
import { StockReservationError } from './stockReservationError.js';

/** 在庫引当サービス */
export const StockReservationService = (
  order: Order,
  productStocks: ReadonlyArray<ProductStock>,
): Result<
  ReadonlyArray<ProductStock>,
  StockReservationError
> => {
  const reservePlans = order.items.map((item) => {
    const { productId } = item.product;
    const productStock = productStocks.find(
      (p) => p.productId === productId,
    );
    const stock = productStock?.stock || 0;
    return { productId, stockDiff: stock - item.quantity };
  });
  const minusStockPlans = reservePlans.filter(
    (updatedProductStock) =>
      updatedProductStock.stockDiff < 0,
  );

  if (minusStockPlans.length === 0) {
    return ok(
      reservePlans.map(({ productId, stockDiff }) => ({
        productId,
        stock: stockDiff,
      })),
    );
  }
  return err(
    new StockReservationError(
      order.orderId,
      minusStockPlans,
    ),
  );
};
