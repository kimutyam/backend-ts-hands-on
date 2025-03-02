import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';
import type { QuantityRefinementsError } from './cartError.js';
import { buildFromZod } from './result.js';

const name = 'Quantity';

const schema = z
  .number()
  .int()
  .min(1)
  .max(10)
  .brand('Quantity');

type QuantityInput = z.input<typeof schema>;
type Quantity = z.infer<typeof schema>;
type QuantityZodError = z.ZodError<QuantityInput>;

const build = (value: QuantityInput): Quantity =>
  schema.parse(value);
const safeBuild = (
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
  build,
  safeBuild,
} as const;

export { Quantity, type QuantityZodError };
