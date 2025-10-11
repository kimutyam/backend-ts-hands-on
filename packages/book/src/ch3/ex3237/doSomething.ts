import type { Result } from 'ch3/ex3231/result.js';
import { Failure, Success } from 'ch3/ex3231/result.js';
import type { MyError, SomethingError } from 'ch3/ex3237/types.js';
import {
  calculate,
  subRouting1,
  subRouting2,
  toMyError,
} from 'ch3/ex3237/types.js';

const doSomething = (): Result<number, SomethingError | MyError> => {
  const result1 = subRouting1();
  const result2 = subRouting2();

  // 1
  if (result1.success) {
    // 2
    if (result2.success) {
      // 3
      const applied = calculate(result1.data, result2.data);
      // 4
      return Success(applied);
    }
    // 5
    const myError = toMyError(result2.error);
    // 6
    return Failure(myError);
  }
  return result1;
};

export { doSomething };
