import type { Result, ResultAsync } from 'neverthrow';

type MyError = { message: string };
type SomeError = { error: string; detail: string };

declare function wrap1(): Result<number, SomeError>;
declare function wrap2(): Result<number, SomeError>;

declare function calculate(a: number, b: number): number;
declare function mapError(a: SomeError): MyError;

export function doSomething(): Result<number, MyError | SomeError> {
  return wrap1()
    .map((r1) =>
      wrap2()
        .map((r2) => calculate(r1, r2))
        .mapErr(mapError),
    )
    .andThen((a) => a);
}

declare function wrapAsync1(): ResultAsync<number, SomeError>;
declare function wrapAsync2(): ResultAsync<number, SomeError>;

export function doSomethingAsync(): ResultAsync<number, SomeError | MyError> {
  return wrapAsync1()
    .map((r1) =>
      wrapAsync2()
        .map((r2) => calculate(r1, r2))
        .mapErr(mapError),
    )
    .andThen((a) => a);
}
