import { ulid } from 'ulidx';
import * as z from 'zod';

const schema = z.string().ulid().brand('CustomerId');
type Input = z.input<typeof schema>;
type CustomerId = z.infer<typeof schema>;

const equals = (a: CustomerId, b: CustomerId): boolean => a === b;

const valueOf = (value: Input): CustomerId => schema.parse(value);

// 乱数生成器のシード
const SEED = 123;
const generate = (): CustomerId => valueOf(ulid(SEED));

const CustomerId = {
  schema,
  build: valueOf,
  equals,
  generate,
} as const;

export { CustomerId };
