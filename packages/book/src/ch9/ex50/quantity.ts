import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { QuantityRefinementsError } from './quantityRefinementsError.js';
import { createFromZod } from './result.js';

const name = 'Quantity';

const schema = z.number().int().min(1).max(10).brand('Quantity');

type Quantity = z.infer<typeof schema>;
type QuantityInput = z.input<typeof schema>;
type QuantityZodError = z.ZodError<Quantity>;

const parse = (value: QuantityInput): Quantity => schema.parse(value);
const safeParse = (
  value: QuantityInput,
): Result<Quantity, QuantityRefinementsError> =>
  R.pipe(
    schema.safeParse(value),
    createFromZod(QuantityRefinementsError.create),
  );

const Quantity = {
  name,
  schema,
  parse,
  safeParse,
} as const;

export { Quantity, type QuantityZodError };
