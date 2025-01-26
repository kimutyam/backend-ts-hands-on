import type { Result } from '../40_result/result.js';
import { Failure, Success } from '../40_result/result.js';

const fromThrowable = <T, E>(f: () => T, onThrow: (e: unknown) => E): Result<T, E> => {
  try {
    const value = f();
    return Success<T>(value);
  } catch (err) {
    return Failure<E>(onThrow(err));
  }
};

export { fromThrowable };
