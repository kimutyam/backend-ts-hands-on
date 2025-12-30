import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

const f1 = (e: Error): Result<number, string> => err(e.name);
const f2 = (name: string): Result<undefined, string> =>
  name === 'RangeError' ? ok(undefined) : err(name);

declare const r1: Result<number, Error>;
// 1
const r2 = r1.orElse(f1);
// 2
const r3 = r2.orElse(f2);

console.log(r3);
