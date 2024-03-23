import type { Result } from 'neverthrow';
import { z } from 'zod';
import { fromZodReturnTypeDefault } from '../../../../branded_type/50_zod_vo/resultBuilder';
import type { Eq } from '../../util/eq';

export declare const OrderQuantityBrand: unique symbol;

const schema = z.number().int().min(1).max(10).brand(OrderQuantityBrand);

export type OrderQuantity = z.infer<typeof schema>;

export type OrderQuantityInput = z.input<typeof schema>;

export type OrderQuantityError = z.ZodError<OrderQuantityInput>;

const build = (a: OrderQuantityInput): OrderQuantity => schema.parse(a);
const safeBuild = (a: OrderQuantityInput): Result<OrderQuantity, OrderQuantityError> =>
  fromZodReturnTypeDefault(schema.safeParse(a));

const equals: Eq<OrderQuantity> = (x: OrderQuantity, y: OrderQuantity): boolean => x === y;

export const OrderQuantity = {
  schema,
  build,
  safeBuild,
  equals,
} as const;
