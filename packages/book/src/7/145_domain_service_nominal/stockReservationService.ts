import { StockReservationError } from '../140_domain_service/stockReservationError';
import { Stock } from '../150_domain_service_nominal_invariants/stock';
import type { Result } from '../60_nominal_builder_assert/result';
import { Failure, Success } from '../60_nominal_builder_assert/result';

type Product = {
  id: string;
  price: number;
};

type OrderItem = {
  product: Product;
  quantity: number;
};

type Order = {
  orderId: string;
  orderItems: ReadonlyArray<OrderItem>;
};

type ProductStock = {
  productId: string;
  stock: Stock;
};

/** 在庫引当サービス */
export const StockReservationService = (
  order: Order,
  productStocks: ReadonlyArray<ProductStock>,
): Result<StockReservationError, ReadonlyArray<ProductStock>> => {
  const reservePlans = order.orderItems.map((orderItem) => {
    const productId = orderItem.product.id;
    const productStock = productStocks.find((p) => p.productId === productId);
    const stock = productStock?.stock || Stock.init;
    // Stock.safeBuildを使う方法もあるが、不変条件違反した入力値をわざわざ入れる必要はない。
    // 最終的に在庫がマイナスになるプロダクトが存在すればエラーにすればよい。
    return { productId, stockDiff: stock.value - orderItem.quantity };
  });

  const minusStockPlans = reservePlans.filter(
    (updatedProductStock) => updatedProductStock.stockDiff < 0,
  );

  if (minusStockPlans.length === 0) {
    return Success(
      reservePlans.map(({ productId, stockDiff }) => ({
        productId,
        // ロジック上、0以上であることは保証されている。
        stock: Stock.build(stockDiff),
      })),
    );
  }
  return Failure(new StockReservationError(order.orderId, minusStockPlans));
};
