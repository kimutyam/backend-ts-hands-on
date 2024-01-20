import type { Result, ResultAsync } from 'neverthrow';

declare const r1: Result<number, Error>;
declare const ra1: ResultAsync<number, Error>;

const r2: number = r1.unwrapOr(0);
const ra2: Promise<number> = ra1.unwrapOr(0);

console.log(r2, ra2);
