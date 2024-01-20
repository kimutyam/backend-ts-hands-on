import type { Result, ResultAsync } from 'neverthrow';
import { ok, err } from 'neverthrow';

declare const r1: Result<number, Error>;
declare const ra1: ResultAsync<number, Error>;
const f = (e: Error): Result<number, string> =>
  e.name === 'UnderZeroError' ? ok(0) : err(e.message);

const r2: Result<number, string> = r1.orElse(f);
const ra2: ResultAsync<number, string> = ra1.orElse(f);

console.log(r2, ra2);
