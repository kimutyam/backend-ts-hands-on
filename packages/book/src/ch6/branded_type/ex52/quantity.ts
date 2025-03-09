import { fromZodReturnType } from 'ch6/branded_type/ex50/resultBuilder.js';
import { QuantityError } from 'ch6/branded_type/ex52/quantityError.js';
import type { Result } from 'neverthrow';
import { z } from 'zod';

const schema = z.number().int().min(1).max(10).brand('Quantity');

export type Quantity = z.infer<typeof schema>;

type Input = z.input<typeof schema>;

const build = (a: Input): Quantity => schema.parse(a);
const safeBuild = (a: Input): Result<Quantity, QuantityError> =>
  fromZodReturnType(schema.safeParse(a), (zodError) =>
    QuantityError.build(zodError.issues.map((issue) => issue.message)),
  );

export const Quantity = {
  build,
  safeBuild,
  schema,
} as const;
