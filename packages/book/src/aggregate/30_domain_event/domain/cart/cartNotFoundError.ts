import type { CustomerId } from 'aggregate/10_zod/domain/customer/customerId.js';
import { AggregateNotFoundError } from 'aggregate/30_domain_event/domain/aggregateNotFoundError.js';

export class CartNotFoundError extends AggregateNotFoundError {
  constructor(id: CustomerId) {
    super(
      `カスタマー: ${id} のカートが見つかりませんでした`,
    );
    this.name = 'CartNotFoundError';
  }
}
