import type { CustomerId } from 'ch8/ex1/customerId.js';

class CartNotFoundError extends Error {
  constructor(public customerId: CustomerId) {
    super(`カートが見つかりませんでした: ${customerId}`);
    this.name = this.constructor.name;
  }
}

export { CartNotFoundError };
