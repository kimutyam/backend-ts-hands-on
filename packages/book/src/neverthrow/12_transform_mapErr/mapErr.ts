import type { Result, ResultAsync } from 'neverthrow';

declare const r1: Result<number, Error>;
declare const ra1: ResultAsync<number, Error>;

const f = (e: Error): string => e.message;

const r2: Result<number, string> = r1.mapErr(f);
const ra2: ResultAsync<number, string> = ra1.mapErr(f);

console.log(r2, ra2);
