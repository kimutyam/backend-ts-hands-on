import { separate } from '../140_domain_service/result';
import { StockReservationError } from '../140_domain_service/stockReservationError';
import type { Result } from '../60_nominal_builder_assert/result';
import { Failure, Success } from '../60_nominal_builder_assert/result';
import { Stock } from './stock';

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
  const results = order.orderItems.map((orderItem) => {
    const productId = orderItem.product.id;
    const productStock = productStocks.find((p) => p.productId === productId);
    const stock = productStock?.stock || Stock.init;

    const result = Stock.minus(orderItem.quantity)(stock);
    if (result.success) {
      return Success({ productId, stock: result.data });
    }
    return Failure({ productId, stock: result.error.value });
  });

  const [lefts, rights] = separate(results);
  if (lefts.length > 0) {
    return Failure(
      new StockReservationError(
        order.orderId,
        lefts.map(({ productId, stock }) => ({ productId, stockDiff: stock })),
      ),
    );
  }
  return Success(rights);
};
