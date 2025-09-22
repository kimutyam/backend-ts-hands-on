import { ulid } from 'ulidx';
import * as z from 'zod';

const schema = z.string().ulid().brand('OrderId');

type Input = z.input<typeof schema>;
type OrderId = z.infer<typeof schema>;

const equals = (a: OrderId, b: OrderId): boolean => a === b;

const valueOf = (value: Input): OrderId => schema.parse(value);

const generate = (): OrderId => valueOf(ulid());

const OrderId = {
  schema,
  valueOf,
  equals,
  generate,
} as const;

export { OrderId };
