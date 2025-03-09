import type { PriceRefinementsError } from '9_always_valid_domain_model/50/cartError.js';
import { buildFromZod } from '9_always_valid_domain_model/50/result.js';
import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

const name = 'Price';

const schema = z
  .number()
  .int()
  .min(100)
  .max(10_000)
  .brand('Price');

type Price = z.infer<typeof schema>;
type PriceInput = z.input<typeof schema>;
type PriceZodError = z.ZodError<PriceInput>;

const build = (value: PriceInput): Price =>
  schema.parse(value);
const safeBuild = (
  value: PriceInput,
): Result<Price, PriceRefinementsError> =>
  R.pipe(
    schema.safeParse(value),
    buildFromZod((zodError) => ({
      kind: name,
      error: zodError,
    })),
  );

const Price = {
  name,
  schema,
  build,
  safeBuild,
} as const;

export { Price, type PriceZodError };
