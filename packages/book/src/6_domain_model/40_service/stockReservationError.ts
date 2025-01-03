export class StockReservationError extends Error {
  constructor(
    public orderId: string,
    public outOfStocks: ReadonlyArray<{ productId: string; shortage: number }>,
  ) {
    super('在庫引当できませんでした');
    this.name = 'StockReservationError';
  }
}
