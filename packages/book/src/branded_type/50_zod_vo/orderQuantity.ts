import type { Result } from 'neverthrow';
import { z } from 'zod';
import type { Eq } from './eq';
import { fromZodReturnTypeDefault } from './resultBuilder';

export declare const OrderQuantityBrand: unique symbol;

const schema = z.number().int().min(1).max(10).brand(OrderQuantityBrand);

export type OrderQuantity = z.infer<typeof schema>;

export type OrderQuantityInput = z.input<typeof schema>;

const build = (a: OrderQuantityInput): OrderQuantity => schema.parse(a);
const safeBuild = (a: OrderQuantityInput): Result<OrderQuantity, z.ZodError<OrderQuantityInput>> =>
  fromZodReturnTypeDefault(schema.safeParse(a));

const equals: Eq<OrderQuantity> = (x: OrderQuantity, y: OrderQuantity): boolean => x === y;

export const OrderQuantity = {
  build,
  safeBuild,
  equals,
  schema,
} as const;
