import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import { StockReservationError } from './stockReservationError';
import type { Order, ProductStock } from './types';

/** 在庫引当サービス */
export const StockReservationService = (
  order: Order,
  productStocks: ReadonlyArray<ProductStock>,
): Result<ReadonlyArray<ProductStock>, StockReservationError> => {
  const reservePlans = order.orderItems.map((orderItem) => {
    const { productId } = orderItem.product;
    const productStock = productStocks.find((p) => p.productId === productId);
    const stock = productStock?.stock || 0;
    return { productId, stockDiff: stock - orderItem.quantity };
  });
  const minusStockPlans = reservePlans.filter(
    (updatedProductStock) => updatedProductStock.stockDiff < 0,
  );

  if (minusStockPlans.length === 0) {
    return ok(
      reservePlans.map(({ productId, stockDiff }) => ({
        productId,
        stock: stockDiff,
      })),
    );
  }
  return err(new StockReservationError(order.orderId, minusStockPlans));
};
