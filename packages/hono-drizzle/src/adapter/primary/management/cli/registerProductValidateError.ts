import type { ApplicationError } from '../../../../app/util/applicationError.js';
import type { RegisterProductArgsZodError } from './registerProductHandler.js';

const kind = 'RegisterProductValidateError';

interface RegisterProductValidateError extends ApplicationError<typeof kind> {
  error: RegisterProductArgsZodError;
}

const create = (
  error: RegisterProductArgsZodError,
): RegisterProductValidateError => ({
  kind,
  message: error.message,
  error,
});

const RegisterProductValidateError = {
  create,
} as const;

export { RegisterProductValidateError };
