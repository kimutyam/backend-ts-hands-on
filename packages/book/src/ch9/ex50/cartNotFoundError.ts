import type { ApplicationError } from 'ch9/ex50/applicationError.js';
import type { CustomerId } from 'ch9/ex50/customerId.js';

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
  create,
} as const;

export { CartNotFoundError };
