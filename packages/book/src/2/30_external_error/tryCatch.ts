import type { Result } from '../23_result/result';
import { Failure, Success } from '../23_result/result';

export function tryCatch<E extends Error, T>(f: () => T, onThrow: (e: unknown) => E): Result<E, T> {
  try {
    const value = f();
    return Success<T>(value);
  } catch (err) {
    return Failure<E>(onThrow(err));
  }
}

export async function tryCatchAsync<E extends Error, T>(
  f: () => Promise<T>,
  onThrow: (e: unknown) => E,
): Promise<Result<E, T>> {
  try {
    const value = await f();
    return Success<T>(value);
  } catch (err) {
    return Failure<E>(onThrow(err));
  }
}
