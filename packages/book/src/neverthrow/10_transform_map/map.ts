import type { Result, ResultAsync } from 'neverthrow';

declare const r1: Result<number, Error>;
declare const ra1: ResultAsync<number, Error>;

const f = (a: number): string => a.toString();

const r2: Result<string, Error> = r1.map(f);
const ra2: ResultAsync<string, Error> = ra1.map(f);

console.log(r2, ra2);
