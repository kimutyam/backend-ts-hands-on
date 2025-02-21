import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';
import { buildFromZodDefault } from './result.js';

const schema = z.number().int().min(1).max(10).brand('Quantity');

type Input = z.input<typeof schema>;
type Quantity = z.infer<typeof schema>;
type QuantityError = z.ZodError<Input>;

const build = (value: Input): Quantity => schema.parse(value);
const safeBuild = (value: Input): Result<Quantity, QuantityError> =>
  R.pipe(schema.safeParse(value), buildFromZodDefault);

const Quantity = {
  schema,
  build,
  safeBuild,
} as const;

export { Quantity, type QuantityError };
