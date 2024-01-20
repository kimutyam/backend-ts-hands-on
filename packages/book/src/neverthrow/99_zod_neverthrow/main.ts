import type { Result } from 'neverthrow';
import { ok, err } from 'neverthrow';
import { identity } from 'remeda';
import { z } from 'zod';

const schema = z
  .number()
  // .transform((v) => v.toString())
  .brand('ZOO');

type A = z.infer<typeof schema>;
type Raw = z.input<typeof schema>;

const safeBuild = (raw: Raw): z.SafeParseReturnType<number, A> => schema.safeParse(raw);
const r = safeBuild(1);

const fromZodReturnType1 = <Input, Output>(
  result: z.SafeParseReturnType<Input, Output>,
): Result<Output, z.ZodError<Input>> => (result.success ? ok(result.data) : err(result.error));

const r2: Result<A, z.ZodError<Raw>> = fromZodReturnType1(r);

console.log(r2);

const fromZodReturnType = <Input, Output, E>(
  result: z.SafeParseReturnType<Input, Output>,
  f: (e: z.ZodError<Input>) => E,
): Result<Output, E> => (result.success ? ok(result.data) : err(f(result.error)));

export const fromZodReturnTypeDefault = <Input, Output>(
  result: z.SafeParseReturnType<Input, Output>,
): Result<Output, z.ZodError<Input>> => fromZodReturnType(result, identity);
