import type { Eq } from 'aggregate/10_zod/util/eq.js';
import { buildFromZodDefault } from 'aggregate/10_zod/util/result.js';
import type { Result } from 'neverthrow';
import { z } from 'zod';

export declare const QuantityBrand: unique symbol;

const schema = z
  .number()
  .int()
  .min(1)
  .max(10)
  .brand(QuantityBrand);

export type Quantity = z.infer<typeof schema>;

export type QuantityInput = z.input<typeof schema>;

export type QuantityError = z.ZodError<QuantityInput>;

const build = (a: QuantityInput): Quantity =>
  schema.parse(a);
const safeBuild = (
  a: QuantityInput,
): Result<Quantity, QuantityError> =>
  buildFromZodDefault(schema.safeParse(a));

const equals: Eq<Quantity> = (
  x: Quantity,
  y: Quantity,
): boolean => x === y;

export const Quantity = {
  schema,
  build,
  safeBuild,
  equals,
} as const;
