import { ulid } from 'ulidx';
import * as z from 'zod';

const name = 'ProductId';

const schema = z.ulid().brand('ProductId');

type ProductId = z.infer<typeof schema>;
type ProductIdInput = z.input<typeof schema>;

const equals = (a: ProductId, b: ProductId): boolean => a === b;

const parse = (value: ProductIdInput): ProductId => schema.parse(value);

const generate = (): ProductId => parse(ulid());

const ProductId = {
  name,
  schema,
  parse,
  equals,
  generate,
} as const;

export { ProductId };
