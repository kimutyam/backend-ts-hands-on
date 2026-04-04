import type { CartZodError } from '#/app/domain/cart/cart.js';
import type { ApplicationError } from '#/app/util/applicationError.js';

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
