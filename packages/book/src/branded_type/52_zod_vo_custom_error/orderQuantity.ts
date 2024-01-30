import type { Result } from 'neverthrow';
import { z } from 'zod';
import { fromZodReturnType } from '../50_zod_vo/resultBuilder';
import { OrderQuantityError } from './orderQuantityError';

export declare const OrderQuantityBrand: unique symbol;

const schema = z.number().int().min(1).max(10).brand(OrderQuantityBrand);

export type OrderQuantity = z.infer<typeof schema>;

type Input = z.input<typeof schema>;

const build = (a: Input): OrderQuantity => schema.parse(a);
const safeBuild = (a: Input): Result<OrderQuantity, OrderQuantityError> =>
  fromZodReturnType(schema.safeParse(a), (zodError) =>
    OrderQuantityError.build(zodError.issues.map((issue) => issue.message)),
  );

export const OrderQuantity = {
  build,
  safeBuild,
  schema,
} as const;
