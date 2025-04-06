import type { ResultAsync } from 'neverthrow';

declare const r: ResultAsync<number, Error>;

// 1
const f = (e: Error): string => e.message;

// 2
const r1: ResultAsync<number, string> = r.mapErr(f);

console.log(r1);
