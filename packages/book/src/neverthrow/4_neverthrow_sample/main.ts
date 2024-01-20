import type { Result } from 'neverthrow';

type MyError = { error: string };
type SomeError = { error: string; detail: string };

declare function wrap1(): Result<number, SomeError>;
declare function wrap2(): Result<number, SomeError>;

declare function calculate(a: number, b: number): number;
declare function mapError(a: SomeError): MyError;

export function doSomething(): Result<number, SomeError | MyError> {
  return wrap1()
    .map((r1) => wrap2().map((r2) => calculate(r1, r2)))
    .mapErr(mapError)
    .andThen((a) => a);
}
