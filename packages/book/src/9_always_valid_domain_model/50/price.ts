import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';
import { buildFromZodDefault } from './result.js';

const schema = z.number().int().min(100).max(10_000).brand('Price');

type Input = z.input<typeof schema>;
type Price = z.infer<typeof schema>;
type PriceError = z.ZodError<Input>;

const build = (value: Input): Price => schema.parse(value);
const safeBuild = (value: Input): Result<Price, PriceError> =>
  R.pipe(schema.safeParse(value), buildFromZodDefault);

const Price = {
  schema,
  build,
  safeBuild,
} as const;

export { Price };
