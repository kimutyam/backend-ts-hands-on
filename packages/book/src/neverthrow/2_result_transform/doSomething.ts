import type { Result } from '../0_result/result';
import { Failure, Success } from '../0_result/result';

type MyError = { message: string };
type SomeError = { error: string; detail: string };

declare function wrap1(): Result<number, SomeError>;
declare function wrap2(): Result<number, SomeError>;

declare function calculate(a: number, b: number): number;

declare function mapError(a: SomeError): MyError;

export function doSomething(): Result<number, SomeError | MyError> {
  const result1 = wrap1();
  const result2 = wrap2();

  if (result1.success) {
    if (result2.success) {
      // 値を取り出して、関数を適用
      const applied = calculate(result1.data, result2.data);
      // 再度、Result型にwrap
      return Success(applied);
    }
    // 値を取り出して、関数を適用
    const myError = mapError(result2.error);
    // 再度、Result型にwrap
    return Failure(myError);
  }
  return result1;
}
