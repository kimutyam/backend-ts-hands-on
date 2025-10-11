import type { SomethingError } from 'ch4/common/somethingError.js';
import type { Result } from 'neverthrow';

const okF = (n: number): number => n * 2;
const errF = (e: SomethingError): string => `NaN: ${e.message}`;

declare const r1: Result<number, SomethingError>;

// 1
const r2 = r1.match(okF, errF);

console.log(r2);
