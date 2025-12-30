import type { Result } from '../exa3231/result.js';
import { Err, Ok } from '../exa3231/result.js';
import type { MyError, SomethingError } from './types.js';
import { calculate, subRouting1, subRouting2, toMyError } from './types.js';

const doSomething = (): Result<number, SomethingError | MyError> => {
  const result1 = subRouting1();
  if (result1.ok) {
    const result2 = subRouting2();
    if (result2.ok) {
      const applied = calculate(result1.data, result2.data);
      return Ok(applied);
    }
    const myError = toMyError(result2.error);
    return Err(myError);
  }
  return result1;
};

export { doSomething };
