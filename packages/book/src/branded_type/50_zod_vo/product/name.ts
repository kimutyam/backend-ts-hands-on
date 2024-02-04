import type { Result } from 'neverthrow';
import { z } from 'zod';
import type { Eq } from '../eq';
import { fromZodReturnTypeDefault } from '../resultBuilder';

export declare const ProductNameBrand: unique symbol;

const schema = z.string().min(1).brand(ProductNameBrand);

export type Name = z.infer<typeof schema>;

export type NameInput = z.input<typeof schema>;

const build = (a: NameInput): Name => schema.parse(a);
const safeBuild = (a: NameInput): Result<Name, z.ZodError<NameInput>> =>
  fromZodReturnTypeDefault(schema.safeParse(a));

const equals: Eq<Name> = (x: Name, y: Name): boolean => x === y;

export const Name = {
  build,
  safeBuild,
  equals,
  schema,
} as const;
