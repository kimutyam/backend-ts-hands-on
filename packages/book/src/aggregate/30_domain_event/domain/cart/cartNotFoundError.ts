import type { CustomerId } from '../../../10_zod/domain/customer/customerId.js';
import { AggregateNotFoundError } from '../aggregateNotFoundError.js';

export class CartNotFoundError extends AggregateNotFoundError {
  constructor(id: CustomerId) {
    super(`カスタマー: ${id} のカートが見つかりませんでした`);
    this.name = 'CartNotFoundError';
  }
}
