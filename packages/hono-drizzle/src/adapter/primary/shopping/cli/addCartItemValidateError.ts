import type { ApplicationError } from '../../../../app/util/applicationError.js';
import type { AddCartItemArgsZodError } from './addCartItemHandler.js';

const kind = 'AddCartItemValidateError';

interface AddCartItemValidateError extends ApplicationError<typeof kind> {
  error: AddCartItemArgsZodError;
}

const create = (error: AddCartItemArgsZodError): AddCartItemValidateError => ({
  kind,
  message: error.message,
  error,
});

const AddCartItemValidateError = {
  create,
} as const;

export { AddCartItemValidateError };
