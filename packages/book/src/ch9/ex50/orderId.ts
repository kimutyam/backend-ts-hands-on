import { ulid } from 'ulidx';
import * as z from 'zod';

const schema = z.string().ulid().brand('OrderId');

type Input = z.input<typeof schema>;
type OrderId = z.infer<typeof schema>;

// 乱数生成器のシード
const SEED = 123;

const equals = (a: OrderId, b: OrderId): boolean => a === b;

const build = (value: Input): OrderId =>
  schema.parse(value);

const generate = (): OrderId => build(ulid(SEED));

const OrderId = {
  schema,
  build,
  equals,
  generate,
} as const;

export { OrderId };
