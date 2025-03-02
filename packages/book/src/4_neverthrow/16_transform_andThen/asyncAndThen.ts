import type { ResultAsync, Result } from 'neverthrow';
import { okAsync, errAsync, ok } from 'neverthrow';

// 適用する同期関数1
const f1 = (n: number): Result<number, Error> => ok(n * 2);
// 適用する非同期関数2
const f2 = (n: number): ResultAsync<string, Error> =>
  okAsync(n.toString());
// 適用する非同期関数3
const f3 = (s: string): ResultAsync<string, undefined> =>
  s === 'NaN' ? errAsync(undefined) : okAsync(s);

const r1: Result<number, Error> = ok(10).andThen(f1);
const r2: ResultAsync<string, Error> = r1.asyncAndThen(f2);
const r3: ResultAsync<string, Error | undefined> =
  r2.andThen(f3);

console.log(r3);
