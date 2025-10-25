import type { ApplicationError } from 'ch9/ex50/applicationError.js';
import type { CartZodError } from 'ch9/ex50/cart.js';

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
