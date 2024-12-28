import type { Result } from '../40_result/result';

type MyError = { message: string };
type SomeError = { error: string; detail: string };

declare function subRouting1(): Result<number, SomeError>;
declare function subRouting2(): Result<number, SomeError>;

declare function calculate(a: number, b: number): number;
declare function toMyError(a: SomeError): MyError;

export { type MyError, type SomeError, subRouting1, subRouting2, calculate, toMyError };
