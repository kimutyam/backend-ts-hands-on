import type { ProductZodError } from '#/app/domain/product/product.js';
import type { ApplicationError } from '#/app/util/applicationError.js';

const kind = 'ProductInvariantViolationError';

interface ProductInvariantViolationError extends ApplicationError<typeof kind> {
  error: ProductZodError;
}

const create = (error: ProductZodError): ProductInvariantViolationError => ({
  kind,
  message: error.message,
  error,
});

const ProductInvariantViolationError = {
  kind,
  create,
} as const;

export { ProductInvariantViolationError };
