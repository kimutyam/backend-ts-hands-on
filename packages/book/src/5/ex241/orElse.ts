import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

const f1 = (e: SomethingError): Result<number, string> => err(e.message);
const f2 = (name: string): Result<undefined, string> =>
  name === 'RangeError' ? ok(undefined) : err(name);

declare const r1: Result<number, SomethingError>;

// Result<number, string>
const r2 = r1.orElse(f1);

// Result<number | undefined, string>
const r3 = r2.orElse(f2);

console.log(r3);
