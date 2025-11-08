import type { ApplicationError } from './applicationError.js';

const kind = 'StockReservation';
interface StockReservationError extends ApplicationError<typeof kind> {
  readonly orderId: string;
  readonly outOfStocks: ReadonlyArray<{
    productId: string;
    shortage: number;
  }>;
}

const create = (
  orderId: string,
  outOfStocks: ReadonlyArray<{
    productId: string;
    shortage: number;
  }>,
): StockReservationError => ({
  kind,
  message: '在庫引当できませんでした',
  orderId,
  outOfStocks,
});

const StockReservationError = {
  kind,
  create,
} as const;

export { StockReservationError };
