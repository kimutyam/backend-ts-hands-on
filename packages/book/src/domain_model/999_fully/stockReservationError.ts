export class StockReservationError extends Error {
  constructor(
    public orderId: string,
    public productStocks: ReadonlyArray<{ productId: string; stockDiff: number }>,
  ) {
    super('在庫引当できませんでした');
    this.name = 'StockReservationError';
  }
}
