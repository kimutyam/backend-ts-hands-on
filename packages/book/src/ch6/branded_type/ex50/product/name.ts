import type { Eq } from 'ch6/branded_type/ex50/eq.js';
import { fromZodReturnTypeDefault } from 'ch6/branded_type/ex50/resultBuilder.js';
import type { Result } from 'neverthrow';
import { z } from 'zod';

const schema = z.string().min(1).brand('ProductName');

export type Name = z.infer<typeof schema>;

export type NameInput = z.input<typeof schema>;

const build = (a: NameInput): Name => schema.parse(a);
const safeBuild = (
  a: NameInput,
): Result<Name, z.ZodError<NameInput>> =>
  fromZodReturnTypeDefault(schema.safeParse(a));

const equals: Eq<Name> = (x: Name, y: Name): boolean =>
  x === y;

export const Name = {
  build,
  safeBuild,
  equals,
  schema,
} as const;
