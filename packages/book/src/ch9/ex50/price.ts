import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import type { ApplicationError } from './applicationError.js';
import { createWithErrorFromZod } from './result.js';

const name = 'Price';

const schema = z.number().int().min(100).max(10_000).brand('Price');

type Price = z.infer<typeof schema>;
type PriceInput = z.input<typeof schema>;

const errorKind = 'QuantityRefinementsError';

type PriceZodError = z.ZodError<PriceInput>;
interface PriceRefinementsError extends ApplicationError<typeof errorKind> {
  error: PriceZodError;
}

const createError = (error: PriceZodError): PriceRefinementsError => ({
  kind: errorKind,
  message: error.message,
  error,
});

const PriceRefinementsError = {
  kind: errorKind,
  create: createError,
} as const;

const parse = (value: PriceInput): Price => schema.parse(value);
const safeParse = (value: PriceInput): Result<Price, PriceRefinementsError> =>
  R.pipe(schema.safeParse(value), createWithErrorFromZod(createError));

const Price = {
  name,
  schema,
  parse,
  safeParse,
} as const;

export { Price, PriceRefinementsError };
