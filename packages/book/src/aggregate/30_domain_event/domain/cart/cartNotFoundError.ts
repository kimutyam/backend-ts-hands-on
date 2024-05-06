import type { CustomerId } from '../../../10_zod/domain/customer/customerId';
import { AggregateNotFoundError } from '../aggregateNotFoundError';

export class CartNotFoundError extends AggregateNotFoundError {
  constructor(id: CustomerId) {
    super(`カスタマー: ${id} のカートが見つかりませんでした`);
    this.name = 'CartNotFoundError';
  }
}
