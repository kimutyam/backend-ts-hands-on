import type { Result, ResultAsync } from 'neverthrow';

declare const r1: Result<number, Error>;
declare const ra1: ResultAsync<number, Error>;

const f1 = (n: number): string => n.toString();
const fe1 = (e: Error): string => `NaN: ${e.message}`;

const r2: string = r1.match(f1, fe1);
const ra2: Promise<string> = ra1.match(f1, fe1);

console.log(r2, ra2);
