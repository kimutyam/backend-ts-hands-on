import type { ApplicationError } from 'ch9/ex50/applicationError.js';
import type { QuantityZodError } from 'ch9/ex50/quantity.js';

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
