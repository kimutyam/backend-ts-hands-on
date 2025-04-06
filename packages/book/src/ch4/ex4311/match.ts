import type { Result } from 'neverthrow';

const okF = (n: number): number => n * 2;
const errF = (e: Error): string => `NaN: ${e.message}`;

declare const r1: Result<number, Error>;

// 1
const r2 = r1.match(okF, errF);

console.log(r2);
