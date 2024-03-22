export class TotalPriceLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TotalPriceLimitError';
  }
}
