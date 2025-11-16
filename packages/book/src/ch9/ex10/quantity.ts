import { z } from 'zod';

const name = 'Quantity';
const schema = z.number().int().min(1).max(10).brand(name);

type Quantity = z.infer<typeof schema>;
type QuantityInput = z.input<typeof schema>;
type QuantityZodError = z.ZodError<Quantity>;

const parse = (value: QuantityInput): Quantity => schema.parse(value);
const safeParse = (value: QuantityInput): z.ZodSafeParseResult<Quantity> =>
  schema.safeParse(value);

const Quantity = {
  name,
  schema,
  parse,
  safeParse,
} as const;

export { Quantity, type QuantityInput, type QuantityZodError };
