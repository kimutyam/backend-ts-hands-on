import type { Result } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare const r: Result<number, SomethingError>;
const f = (e: SomethingError): string => e.message;

// Result<number, string>;
const r1: Result<number, string> = r.mapErr(f);

console.log(r1);
