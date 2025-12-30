import type { Result } from '../ex231/result.js';
import { Failure, Success } from '../ex231/result.js';

const fromThrowable = <T, E>(
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

export { fromThrowable };
