import type { ApplicationError } from './applicationError.js';
import type { CartZodError } from './cart.js';

const kind = 'CartRefinementsError';

interface CartRefinementsError extends ApplicationError<typeof kind> {
  error: CartZodError;
}

const create = (error: CartZodError): CartRefinementsError => ({
  kind,
  message: error.message,
  error,
});

const CartRefinementsError = {
  kind,
  create,
} as const;

export { CartRefinementsError };
