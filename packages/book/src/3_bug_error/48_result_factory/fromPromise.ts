import type { Result } from '3_bug_error/40_result/result.js';
import {
  Failure,
  Success,
} from '3_bug_error/40_result/result.js';

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
