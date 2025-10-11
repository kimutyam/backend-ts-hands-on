import type { SomethingError } from 'ch4/common/somethingError.js';
import type { Result } from 'neverthrow';

declare const r: Result<number, SomethingError>;

// 1
const f = (e: SomethingError): string => e.message;

// 2
const r1: Result<number, string> = r.mapErr(f);

console.log(r1);
