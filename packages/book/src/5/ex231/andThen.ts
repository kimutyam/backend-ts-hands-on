import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

const f1 = (n: number): Result<number, SomethingError> => ok(n * 2);
const f2 = (n: number): Result<string, SomethingError> => ok(n.toString());
const f3 = (s: string): Result<string, undefined> =>
  s === 'NaN' ? err(undefined) : ok(s);

// Result<number, SomethingError>
const r1 = ok(10).andThen(f1);

// Result<number, SomethingError>
const r2 = r1.andThen(f2);

// Result<string, SomethingError | undefined>
const r3 = r2.andThen(f3);

const r = ok(10).andThen(f1).andThen(f2).andThen(f3);

console.log(r, r3);
