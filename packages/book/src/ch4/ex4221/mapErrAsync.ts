import type { SomethingError } from 'ch4/common/somethingError.js';
import type { ResultAsync } from 'neverthrow';

declare const r: ResultAsync<number, SomethingError>;

// 1
const f = (e: SomethingError): string => e.message;

// 2
const r1: ResultAsync<number, string> = r.mapErr(f);

console.log(r1);
