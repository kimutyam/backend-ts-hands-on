import type { Result } from 'ch3/ex40/result.js';

type MyError = { message: string };
type SomeError = { error: string; detail: string };

declare function subRouting1(): Result<number, SomeError>;
declare function subRouting2(): Result<number, SomeError>;

declare function calculate(a: number, b: number): number;
declare function toMyError(a: SomeError): MyError;

export { type MyError, type SomeError, subRouting1, subRouting2, calculate, toMyError };
