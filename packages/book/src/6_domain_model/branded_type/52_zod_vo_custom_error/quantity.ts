import { fromZodReturnType } from '6_domain_model/branded_type/50_zod_vo/resultBuilder.js';
import { QuantityError } from '6_domain_model/branded_type/52_zod_vo_custom_error/quantityError.js';
import type { Result } from 'neverthrow';
import { z } from 'zod';

const schema = z
  .number()
  .int()
  .min(1)
  .max(10)
  .brand('Quantity');

export type Quantity = z.infer<typeof schema>;

type Input = z.input<typeof schema>;

const build = (a: Input): Quantity => schema.parse(a);
const safeBuild = (
  a: Input,
): Result<Quantity, QuantityError> =>
  fromZodReturnType(schema.safeParse(a), (zodError) =>
    QuantityError.build(
      zodError.issues.map((issue) => issue.message),
    ),
  );

export const Quantity = {
  build,
  safeBuild,
  schema,
} as const;
