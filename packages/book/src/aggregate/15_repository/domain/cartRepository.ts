import type { Cart } from '../../10_zod/domain/cart/cart';
import type { CustomerId } from '../../10_zod/domain/customer/customerId';

export interface ICartRepository {
  findById(aggregateId: CustomerId): Promise<Cart>;
  save(aggregate: Cart): Promise<void>;
  deleteById(aggregateId: CustomerId): Promise<void>;
}
