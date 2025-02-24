import { ulid } from 'ulidx';
import * as z from 'zod';

const schema = z.string().ulid().brand('ProductId');

type ProductId = z.infer<typeof schema>;
type ProductInput = z.input<typeof schema>;

const equals = (a: ProductId, b: ProductId): boolean => a === b;

const build = (value: ProductInput): ProductId => schema.parse(value);

// 乱数生成器のシード
const SEED = 123;
const generate = (): ProductId => build(ulid(SEED));

const ProductId = {
  schema,
  build,
  equals,
  generate,
} as const;

export { ProductId };
