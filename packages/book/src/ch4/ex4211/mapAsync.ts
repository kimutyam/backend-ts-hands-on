import type { ResultAsync } from 'neverthrow';

declare const r: ResultAsync<number, Error>;

// 1
const f = (a: number): string => a.toString();

// 2
const r1 = r.map(f);

console.log(r1);
