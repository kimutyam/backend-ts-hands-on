import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import * as R from 'remeda';
import type { z } from 'zod';

export const fromZodReturnType =
  <T, E = z.ZodError<T>>(f: (e: z.ZodError<T>) => E) =>
  (result: z.ZodSafeParseResult<T>): Result<T, E> =>
    result.success ? ok(result.data) : err(f(result.error));

export const fromZodReturnTypeDefault = <T>(
  result: z.ZodSafeParseResult<T>,
): Result<T, z.ZodError<T>> => R.pipe(result, fromZodReturnType(R.identity()));
