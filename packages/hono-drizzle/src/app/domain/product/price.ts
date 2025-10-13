import { z } from 'zod';

const name = 'Price';

const schema = z.number().int().min(100).max(10_000).brand(name);

type Price = z.infer<typeof schema>;
type PriceInput = z.input<typeof schema>;

const parse = (value: PriceInput): Price => schema.parse(value);

const Price = {
  name,
  schema,
  parse,
} as const;

export { Price };
