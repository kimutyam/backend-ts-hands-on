import type { Order } from 'domain_model/999_fully/order.js';
import type { ProductStock } from 'domain_model/999_fully/productStock.js';
import { StockReservationError } from 'domain_model/999_fully/stockReservationError.js';
import { err, ok } from 'neverthrow';
import type { Result } from 'neverthrow';

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
