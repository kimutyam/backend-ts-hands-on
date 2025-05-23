import type { Eq } from 'ch6/archive/branded_type/ex50/eq.js';
import { fromZodReturnTypeDefault } from 'ch6/archive/branded_type/ex50/resultBuilder.js';
import type { Result } from 'neverthrow';
import { z } from 'zod';

// export declare const QuantityBrand: unique symbol;

const schema = z.number().int().min(1).max(10).brand('Quantity');

export type Quantity = z.infer<typeof schema>;

export type QuantityInput = z.input<typeof schema>;

const build = (a: QuantityInput): Quantity => schema.parse(a);
const safeBuild = (
  a: QuantityInput,
): Result<Quantity, z.ZodError<QuantityInput>> =>
  fromZodReturnTypeDefault(schema.safeParse(a));

const equals: Eq<Quantity> = (x: Quantity, y: Quantity): boolean => x === y;

export const Quantity = {
  build,
  safeBuild,
  equals,
  schema,
} as const;
