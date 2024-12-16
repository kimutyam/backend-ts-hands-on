import type { Result } from '../40_result/result';
import { Failure, Success } from '../40_result/result';

const fromThrowable = <T, E>(f: () => T, onThrow: (e: unknown) => E): Result<T, E> => {
  try {
    const value = f();
    return Success<T>(value);
  } catch (err) {
    return Failure<E>(onThrow(err));
  }
};

const fromPromise = async <T, E>(
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

export { fromPromise, fromThrowable };
