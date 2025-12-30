import type { Result } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

const okF = (n: number): number => n * 2;
const errF = (e: SomethingError): string => `NaN: ${e.message}`;

declare const r1: Result<number, SomethingError>;

// 1
const r2 = r1.match(okF, errF);

console.log(r2);
