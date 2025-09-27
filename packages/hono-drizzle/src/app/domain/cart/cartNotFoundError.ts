import type { ApplicationError } from '../../util/applicationError.js';
import type { CustomerId } from '../customer/customerId.js';

const kind = 'CartNotFound';
interface CartNotFoundError extends ApplicationError<typeof kind> {
  readonly customerId: CustomerId;
}

const create = (customerId: CustomerId): CartNotFoundError => ({
  kind,
  message: `カートが見つかりませんでした: ${customerId}`,
  customerId,
});

const CartNotFoundError = {
  kind,
  create,
} as const;

export { CartNotFoundError };
