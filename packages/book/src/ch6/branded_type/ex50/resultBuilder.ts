import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import { identity } from 'remeda';
import type { z } from 'zod';

export const fromZodReturnType = <Input, Output, E = z.ZodError<Input>>(
  result: z.SafeParseReturnType<Input, Output>,
  f: (e: z.ZodError<Input>) => E,
): Result<Output, E> =>
  result.success ? ok(result.data) : err(f(result.error));

export const fromZodReturnTypeDefault = <Input, Output>(
  result: z.SafeParseReturnType<Input, Output>,
): Result<Output, z.ZodError<Input>> => fromZodReturnType(result, identity());
