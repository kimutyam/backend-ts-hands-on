import type { Result, ResultAsync } from 'neverthrow';
import { errAsync, ok, okAsync } from 'neverthrow';

const f1 = (n: number): Result<number, Error> => ok(n * 2);
const f2 = (n: number): ResultAsync<string, Error> => okAsync(n.toString());
const f3 = (s: string): ResultAsync<string, undefined> =>
  s === 'NaN' ? errAsync(undefined) : okAsync(s);

// 1
const r1 = ok(10).andThen(f1);
// 2
const r2 = r1.asyncAndThen(f2);
// 3
const r3 = r2.andThen(f3);

console.log(r3);
