import type { Result } from '../23_result/result.js';
import { Failure, Success } from '../23_result/result.js';

export const fromThrowable = <T, E extends Error>(
  f: () => T,
  onThrow: (e: unknown) => E,
): Result<T, E> => {
  try {
    const value = f();
    return Success<T>(value);
  } catch (err) {
    return Failure<E>(onThrow(err));
  }
};

export const fromPromise = async <T, E extends Error>(
  f: () => Promise<T>,
  onThrow: (e: unknown) => E,
): Promise<Result<T, E>> => {
  try {
    const value = await f();
    return Success<T>(value);
  } catch (err) {
    return Failure<E>(onThrow(err));
  }
};
