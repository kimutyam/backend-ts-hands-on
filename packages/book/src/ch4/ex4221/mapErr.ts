import type { Result } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare const r: Result<number, SomethingError>;

// 1
const f = (e: SomethingError): string => e.message;

// 2
const r1: Result<number, string> = r.mapErr(f);

console.log(r1);
