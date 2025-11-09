import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import type { z } from 'zod';

const createFromZod =
  <Input, Output, E = z.ZodError<Input>>(f: (e: z.ZodError<Input>) => E) =>
  (result: z.SafeParseReturnType<Input, Output>): Result<Output, E> =>
    result.success ? ok(result.data) : err(f(result.error));

export { createFromZod };
