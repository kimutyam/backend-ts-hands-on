import { z } from 'zod';

const name = 'ProductName';

const schema = z.string().min(1).max(100).brand(name);

type ProductName = z.infer<typeof schema>;
type ProductNameInput = z.input<typeof schema>;

const parse = (value: ProductNameInput): ProductName => schema.parse(value);

const equals = (a: ProductName, b: ProductName): boolean => a === b;

const ProductName = {
  schema,
  parse,
  equals,
} as const;

export { ProductName };
