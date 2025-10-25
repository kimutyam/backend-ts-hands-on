import { QuantityRefinementsError } from 'ch9/ex50/quantityRefinementsError.js';
import { createWithErrorFromZod } from 'ch9/ex50/result.js';
import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

const name = 'Quantity';

const schema = z.number().int().min(1).max(10).brand('Quantity');

type Quantity = z.infer<typeof schema>;
type QuantityInput = z.input<typeof schema>;
type QuantityZodError = z.ZodError<QuantityInput>;

const parse = (value: QuantityInput): Quantity => schema.parse(value);
const safeParse = (
  value: QuantityInput,
): Result<Quantity, QuantityRefinementsError> =>
  R.pipe(
    schema.safeParse(value),
    createWithErrorFromZod(QuantityRefinementsError.create),
  );

const Quantity = {
  name,
  schema,
  parse,
  safeParse,
} as const;

export { Quantity, type QuantityZodError };
