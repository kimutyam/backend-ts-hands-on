import type { QuantityRefinementsError } from '9_always_valid_domain_model/50/cartError.js';
import { buildFromZod } from '9_always_valid_domain_model/50/result.js';
import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

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
