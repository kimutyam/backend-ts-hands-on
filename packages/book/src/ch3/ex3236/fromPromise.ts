import type { Result } from 'ch3/ex3231/result.js';
import { Failure, Success } from 'ch3/ex3231/result.js';

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

export { fromPromise };
