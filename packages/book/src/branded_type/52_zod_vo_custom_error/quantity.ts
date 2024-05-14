import type { Result } from 'neverthrow';
import { z } from 'zod';
import { fromZodReturnType } from '../50_zod_vo/resultBuilder';
import { QuantityError } from './quantityError';

export declare const QuantityBrand: unique symbol;

const schema = z.number().int().min(1).max(10).brand(QuantityBrand);

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
