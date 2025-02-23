import { z } from 'zod';

const schema = z.number().int().min(100).max(10_000).brand('Price');

type Input = z.input<typeof schema>;
type Price = z.infer<typeof schema>;

const build = (value: Input): Price => schema.parse(value);
const safeBuild = (value: Input): z.SafeParseReturnType<Input, Price> => schema.safeParse(value);

const Price = {
  schema,
  build,
  safeBuild,
} as const;

export { Price };
