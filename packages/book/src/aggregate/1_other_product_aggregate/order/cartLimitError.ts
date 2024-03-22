export class CartLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartLimitError';
  }
}
