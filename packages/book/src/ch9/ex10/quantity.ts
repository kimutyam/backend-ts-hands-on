import { z } from 'zod';

const name = 'Quantity';
const schema = z
  .number()
  .int()
  .min(1)
  .max(10)
  .brand(typeof name);

type Quantity = z.infer<typeof schema>;
type QuantityInput = z.input<typeof schema>;

const build = (value: QuantityInput): Quantity => schema.parse(value);
const safeBuild = (
  value: QuantityInput,
): z.SafeParseReturnType<QuantityInput, Quantity> => schema.safeParse(value);

const Quantity = {
  name,
  schema,
  build,
  safeBuild,
} as const;

export { Quantity, type QuantityInput };
