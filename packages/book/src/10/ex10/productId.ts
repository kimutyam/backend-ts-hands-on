import { ulid } from 'ulidx';
import * as z from 'zod';

const name = 'ProductId';
const schema = z.ulid().brand(typeof name);

type ProductId = z.infer<typeof schema>;
type ProductInput = z.input<typeof schema>;

const equals = (a: ProductId, b: ProductId): boolean => a === b;

const parse = (value: ProductInput): ProductId => schema.parse(value);

const generate = (): ProductId => parse(ulid());

const ProductId = {
  name,
  schema,
  parse,
  equals,
  generate,
} as const;

export { ProductId };
