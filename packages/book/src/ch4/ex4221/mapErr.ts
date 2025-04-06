import type { Result } from 'neverthrow';

declare const r: Result<number, Error>;

// 1
const f = (e: Error): string => e.message;

// 2
const r1: Result<number, string> = r.mapErr(f);

console.log(r1);
