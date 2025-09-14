import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { buildFromZod } from '../../../util/result.js';
import type { PriceRefinementsError } from '../cart/cartError.js';

const name = 'Price';

const schema = z.number().int().min(100).max(10_000).brand('Price');

type Price = z.infer<typeof schema>;
type PriceInput = z.input<typeof schema>;
type PriceZodError = z.ZodError<PriceInput>;

const parse = (value: PriceInput): Price => schema.parse(value);
const safeParse = (value: PriceInput): Result<Price, PriceRefinementsError> =>
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
  parse,
  safeParse,
} as const;

export { Price, type PriceZodError };
