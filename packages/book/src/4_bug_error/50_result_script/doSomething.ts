import type { Result } from '../40_result/result';
import { Failure, Success } from '../40_result/result';
import type { MyError, SomeError } from './types';
import { calculate, toMyError, subRouting1, subRouting2 } from './types';

const doSomething = (): Result<number, SomeError | MyError> => {
  const result1 = subRouting1();
  const result2 = subRouting2();

  // 型の絞り込みで、値をアンラップする
  if (result1.success) {
    // 型の絞り込みで、値をアンラップする
    if (result2.success) {
      // 関数を適用する
      const applied = calculate(result1.data, result2.data);
      // 値をラップする
      return Success(applied);
    }
    // 関数を適用する
    const myError = toMyError(result2.error);
    // 値をラップする
    return Failure(myError);
  }
  return result1;
};

export { doSomething };
