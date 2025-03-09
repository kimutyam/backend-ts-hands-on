import type { Result } from 'neverthrow';
import { ok, err } from 'neverthrow';

declare const r: Result<number, Error>;

// 適用する関数1
const f1 = (e: Error): Result<number, string> =>
  err(e.message);
// 適用する関数2
const f2 = (e: Error): Result<undefined, string> =>
  e.name === 'RangeError' ? ok(undefined) : err(e.message);

const r1: Result<number, string> = r.orElse(f1);
const r2: Result<number | undefined, string> = r.orElse(f2);

console.log(r1, r2);
