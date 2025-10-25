import type { ApplicationError } from '../../util/applicationError.js';
import type { ProductZodError } from './product.js';

const kind = 'ProductRefinementsError';

interface ProductRefinementsError extends ApplicationError<typeof kind> {
  error: ProductZodError;
}

const create = (error: ProductZodError): ProductRefinementsError => ({
  kind,
  message: error.message,
  error,
});

const ProductRefinementsError = {
  kind,
  create,
} as const;

export { ProductRefinementsError };
