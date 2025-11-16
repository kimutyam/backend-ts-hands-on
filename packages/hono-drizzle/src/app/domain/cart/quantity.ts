import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import type { ApplicationError } from '../../util/applicationError.js';
import { createFromZod } from '../../util/result.js';

const name = 'Quantity';

const schema = z.number().int().min(1).max(10).brand('Quantity');

type Quantity = z.infer<typeof schema>;
type QuantityInput = z.input<typeof schema>;
type QuantityZodError = z.ZodError<Quantity>;

const errorKind = 'QuantityRefinementsError';

interface QuantityRefinementsError extends ApplicationError<typeof errorKind> {
  error: QuantityZodError;
}

const createError = (error: QuantityZodError): QuantityRefinementsError => ({
  kind: errorKind,
  message: error.message,
  error,
});

const QuantityRefinementsError = {
  kind: errorKind,
  create: createError,
} as const;

const parse = (value: QuantityInput): Quantity => schema.parse(value);
const safeParse = (
  value: QuantityInput,
): Result<Quantity, QuantityRefinementsError> =>
  R.pipe(schema.safeParse(value), createFromZod(createError));

const Quantity = {
  name,
  schema,
  parse,
  safeParse,
} as const;

export { Quantity, QuantityRefinementsError };
