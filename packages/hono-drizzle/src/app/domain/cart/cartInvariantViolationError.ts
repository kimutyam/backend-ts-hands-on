import type { CartZodError } from '#/app/domain/cart/cart.js';
import type { ApplicationError } from '#/app/util/applicationError.js';

const kind = 'CartInvariantViolationError';

interface CartInvariantViolationError extends ApplicationError<typeof kind> {
  error: CartZodError;
}

const create = (error: CartZodError): CartInvariantViolationError => ({
  kind,
  message: error.message,
  error,
});

const CartInvariantViolationError = {
  kind,
  create,
} as const;

export { CartInvariantViolationError };
