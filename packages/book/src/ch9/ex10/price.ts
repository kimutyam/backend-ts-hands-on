import { z } from 'zod';

const name = 'Price';
const schema = z
  .number()
  .int()
  .min(100)
  .max(10_000)
  .brand(typeof name);

type Price = z.infer<typeof schema>;
type PriceInput = z.input<typeof schema>;

const build = (value: PriceInput): Price => schema.parse(value);
const safeBuild = (value: PriceInput): z.SafeParseReturnType<PriceInput, Price> =>
  schema.safeParse(value);

const Price = {
  name,
  schema,
  build,
  safeBuild,
} as const;

export { Price };
