import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import { identity } from 'remeda';
import type { z } from 'zod';

const buildFromZod = <Input, Output, E = z.ZodError<Input>>(
  result: z.SafeParseReturnType<Input, Output>,
  f: (e: z.ZodError<Input>) => E,
): Result<Output, E> => (result.success ? ok(result.data) : err(f(result.error)));

const buildFromZodDefault = <Input, Output>(
  result: z.SafeParseReturnType<Input, Output>,
): Result<Output, z.ZodError<Input>> => buildFromZod(result, identity());

export { buildFromZod, buildFromZodDefault };
