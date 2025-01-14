import type { CustomerId } from './customerId';

class CartNotFoundError extends Error {
  constructor(
    message: string,
    public customerId: CustomerId,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export { CartNotFoundError };
