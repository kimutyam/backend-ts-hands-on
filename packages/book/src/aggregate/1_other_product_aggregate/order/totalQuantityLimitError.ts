export class TotalQuantityLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderQuantityLimitError';
  }
}
