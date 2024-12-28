import type { ResultAsync } from 'neverthrow';

declare const r: ResultAsync<number, Error>;

const okF = (n: number): number => n * 2;
const errF = (e: Error): string => `NaN: ${e.message}`;

const r1: Promise<number | string> = r.match(okF, errF);

console.log(r1);
