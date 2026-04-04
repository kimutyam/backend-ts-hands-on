import type { ProductZodError } from '#/app/domain/product/product.js';
import type { ApplicationError } from '#/app/util/applicationError.js';

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
