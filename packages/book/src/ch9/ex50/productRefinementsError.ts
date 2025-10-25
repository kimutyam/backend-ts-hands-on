import type { ApplicationError } from 'ch9/ex50/applicationError.js';
import type { ProductZodError } from 'ch9/ex50/product.js';

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
