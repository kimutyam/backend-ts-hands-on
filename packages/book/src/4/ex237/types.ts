import type { Result } from '../ex231/result.js';

type MyError = { message: string };
type SomethingError = { error: string; detail: string };

declare function subRouting1(): Result<number, SomethingError>;
declare function subRouting2(): Result<number, SomethingError>;

declare function calculate(a: number, b: number): number;
declare function toMyError(a: SomethingError): MyError;

export {
  calculate,
  type MyError,
  type SomethingError,
  subRouting1,
  subRouting2,
  toMyError,
};
