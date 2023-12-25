import type { Result } from '../60_nominal_builder_assert/result';
import { Failure, Success } from '../60_nominal_builder_assert/result';
import { StockReservationError } from './stockReservationError';
import type { Order, ProductStock } from './types';

/** 在庫引当サービス */
export const StockReservationService = (
  order: Order,
  productStocks: ReadonlyArray<ProductStock>,
): Result<StockReservationError, ReadonlyArray<ProductStock>> => {
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
    return Success(
      reservePlans.map(({ productId, stockDiff }) => ({
        productId,
        stock: stockDiff,
      })),
    );
  }
  return Failure(new StockReservationError(order.orderId, minusStockPlans));
};
