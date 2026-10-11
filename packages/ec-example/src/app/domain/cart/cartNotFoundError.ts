import type { CustomerId } from '#/app/domain/customer/customerId.js';
import type { ApplicationError } from '#/app/util/applicationError.js';

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
  kind,
  create,
} as const;

export { CartNotFoundError };
