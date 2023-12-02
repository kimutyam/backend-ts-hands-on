export class StockReservationError extends Error {
  constructor(
    public orderId: string,
    public productStocks: ReadonlyArray<{ productId: string; stock: number }>,
  ) {
    super('在庫引当できませんでした');
    this.name = 'StockReservationError';
  }
}
