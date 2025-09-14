import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { buildFromZod } from '../../../util/result.js';
import type { QuantityRefinementsError } from './cartError.js';

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
    buildFromZod((zodError) => ({
      kind: name,
      error: zodError,
    })),
  );

const Quantity = {
  name,
  schema,
  parse,
  safeParse,
} as const;

export { Quantity, type QuantityZodError };
