import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import * as R from 'remeda';
import { identity } from 'remeda';
import type { z } from 'zod';

const buildFromZod =
  <Input, Output, E = z.ZodError<Input>>(f: (e: z.ZodError<Input>) => E) =>
  (result: z.SafeParseReturnType<Input, Output>): Result<Output, E> =>
    result.success ? ok(result.data) : err(f(result.error));

const buildFromZodDefault = <Input, Output>(
  result: z.SafeParseReturnType<Input, Output>,
): Result<Output, z.ZodError<Input>> =>
  R.pipe(result, buildFromZod(identity()));

export { buildFromZod, buildFromZodDefault };
