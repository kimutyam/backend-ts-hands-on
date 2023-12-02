import type { Result } from '../60_nominal_builder_assert/result';
import { Failure, Success } from '../60_nominal_builder_assert/result';
import { StockReservationError } from './stockReservationError';

/** 商品在庫 */
type ProductStock = {
  productId: string;
  stock: number;
};

/** 商品 */
type Product = {
  productId: string;
  price: number;
};

/** 注文項目 */
type OrderItem = {
  product: Product;
  quantity: number;
};

/** 注文 */
type Order = {
  orderId: string;
  orderItems: ReadonlyArray<OrderItem>;
};

/** 在庫引当サービス */
export const StockReservationService = (
  order: Order,
  productStocks: ReadonlyArray<ProductStock>,
): Result<StockReservationError, ReadonlyArray<ProductStock>> => {
  const reservePlans = order.orderItems.map((orderItem) => {
    const { productId } = orderItem.product;
    const productStock = productStocks.find((p) => p.productId === productId);
    const stock = productStock?.stock || 0;
    return { productId, stock: stock - orderItem.quantity };
  });
  const minusStockPlans = reservePlans.filter(
    (updatedProductStock) => updatedProductStock.stock < 0,
  );

  if (minusStockPlans.length === 0) {
    return Success(reservePlans);
  }
  return Failure(new StockReservationError(order.orderId, minusStockPlans));
};
