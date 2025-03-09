import type { CustomerId } from 'chx/ex10/domain/customer/customerId.js';
import { AggregateNotFoundError } from 'chx/ex30/domain/aggregateNotFoundError.js';

export class CartNotFoundError extends AggregateNotFoundError {
  constructor(id: CustomerId) {
    super(`カスタマー: ${id} のカートが見つかりませんでした`);
    this.name = 'CartNotFoundError';
  }
}
