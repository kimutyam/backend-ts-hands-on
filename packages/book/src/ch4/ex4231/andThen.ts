import type { SomethingError } from 'ch4/common/somethingError.js';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

const f1 = (n: number): Result<number, SomethingError> => ok(n * 2);
const f2 = (n: number): Result<string, SomethingError> => ok(n.toString());
const f3 = (s: string): Result<string, undefined> =>
  s === 'NaN' ? err(undefined) : ok(s);

// 1
const r1 = ok(10).andThen(f1);
// 2
const r2 = r1.andThen(f2);
// 3
const r3 = r2.andThen(f3);

console.log(r3);
