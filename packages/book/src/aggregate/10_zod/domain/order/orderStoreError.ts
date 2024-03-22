export class CartStoreError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartStoreError';
  }
}
