import type { Eq } from 'chx/ex10/util/eq.js';
import { ulid } from 'ulidx';
import * as z from 'zod';

export declare const OrderIdBrand: unique symbol;

const schema = z.string().ulid().brand(OrderIdBrand);

type Input = z.input<typeof schema>;
export type OrderId = z.infer<typeof schema>;

const generate = (): OrderId => schema.parse(ulid());

const equals: Eq<OrderId> = (x: OrderId, y: OrderId): boolean => x === y;

const build = (a: Input): OrderId => schema.parse(a);

export const OrderId = {
  schema,
  build,
  generate,
  equals,
} as const;
