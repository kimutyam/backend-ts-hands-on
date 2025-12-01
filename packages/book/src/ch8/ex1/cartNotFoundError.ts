import type { ApplicationError } from './applicationError.js';
import type { CustomerId } from './customerId.js';

const kind = 'CartNotFoundError';

interface CartNotFoundError extends ApplicationError<typeof kind> {
  readonly customerId: CustomerId;
}

const create = (customerId: CustomerId): CartNotFoundError => ({
  kind,
  message: `カートが見つかりませんでした: ${customerId}`,
  customerId,
});

const CartNotFoundError = {
  create,
} as const;

export { CartNotFoundError };
