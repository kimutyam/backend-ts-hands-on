import type { ResultAsync } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare function okF(n: number): number;
declare function errF(e: SomethingError): string;

declare const ra1: ResultAsync<number, SomethingError>;

// Promise<number | string>
const ra2 = ra1.match(okF, errF);

console.log(ra2);
