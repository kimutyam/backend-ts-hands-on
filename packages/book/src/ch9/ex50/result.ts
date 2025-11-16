import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import type { z } from 'zod';

const createFromZod =
  <T, E = z.ZodError<T>>(f: (e: z.ZodError<T>) => E) =>
  (result: z.ZodSafeParseResult<T>): Result<T, E> =>
    result.success ? ok(result.data) : err(f(result.error));

export { createFromZod };
