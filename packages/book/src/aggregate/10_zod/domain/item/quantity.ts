import type { Result } from 'neverthrow';
import { z } from 'zod';
import { fromZodReturnTypeDefault } from '../../../../6_domain_model/branded_type/50_zod_vo/resultBuilder.js';
import type { Eq } from '../../util/eq.js';

export declare const QuantityBrand: unique symbol;

const schema = z.number().int().min(1).max(10).brand(QuantityBrand);

export type Quantity = z.infer<typeof schema>;

export type QuantityInput = z.input<typeof schema>;

export type QuantityError = z.ZodError<QuantityInput>;

const build = (a: QuantityInput): Quantity => schema.parse(a);
const safeBuild = (a: QuantityInput): Result<Quantity, QuantityError> =>
  fromZodReturnTypeDefault(schema.safeParse(a));

const equals: Eq<Quantity> = (x: Quantity, y: Quantity): boolean => x === y;

export const Quantity = {
  schema,
  build,
  safeBuild,
  equals,
} as const;
