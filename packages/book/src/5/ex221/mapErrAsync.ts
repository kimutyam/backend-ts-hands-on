import type { ResultAsync } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare const ra: ResultAsync<number, SomethingError>;
declare function f(e: SomethingError): string;

// ResultAsync<number, string>
const ra1: ResultAsync<number, string> = ra.mapErr(f);

console.log(ra1);
