import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import type { ApplicationError } from '#/app/util/applicationError.js';
import { createFromZod } from '#/app/util/result.js';

const name = 'Quantity';

const schema = z.int().min(1).max(10).brand('Quantity').meta({
  example: 2,
  description: '数量',
});

type QuantityInput = z.input<typeof schema>;
type Quantity = z.output<typeof schema>;
type QuantityZodError = z.ZodError<Quantity>;

const errorKind = 'QuantityInvariantViolationError';

interface QuantityInvariantViolationError extends ApplicationError<
  typeof errorKind
> {
  error: QuantityZodError;
}

const createError = (
  error: QuantityZodError,
): QuantityInvariantViolationError => ({
  kind: errorKind,
  message: error.message,
  error,
});

const QuantityInvariantViolationError = {
  kind: errorKind,
  create: createError,
} as const;

const parse = (value: QuantityInput): Quantity => schema.parse(value);
const safeParse = (
  value: QuantityInput,
): Result<Quantity, QuantityInvariantViolationError> =>
  R.pipe(schema.safeParse(value), createFromZod(createError));

const Quantity = {
  name,
  schema,
  parse,
  safeParse,
} as const;

export { Quantity, QuantityInvariantViolationError };
