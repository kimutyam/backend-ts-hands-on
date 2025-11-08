import type { ApplicationError } from './applicationError.js';
import type { QuantityZodError } from './quantity.js';

const kind = 'QuantityRefinementsError';

interface QuantityRefinementsError extends ApplicationError<typeof kind> {
  error: QuantityZodError;
}

const create = (error: QuantityZodError): QuantityRefinementsError => ({
  kind,
  message: error.message,
  error,
});

const QuantityRefinementsError = {
  kind,
  create,
} as const;

export { QuantityRefinementsError };
