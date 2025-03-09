import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

// 適用する関数1
const f1 = (n: number): Result<number, Error> => ok(n * 2);
// 適用する関数2
const f2 = (n: number): Result<string, Error> => ok(n.toString());
// 適用する関数3
const f3 = (s: string): Result<string, undefined> =>
  s === 'NaN' ? err(undefined) : ok(s);

const r1: Result<number, Error> = ok(10).andThen(f1);
const r2: Result<string, Error> = r1.andThen(f2);
const r3: Result<string, Error | undefined> = r2.andThen(f3);

console.log(r3);
