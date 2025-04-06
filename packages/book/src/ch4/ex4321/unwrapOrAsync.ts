import type { ResultAsync } from 'neverthrow';

declare const r1: ResultAsync<number, Error>;

// 1
const r2 = r1.unwrapOr(false);

console.log(r2);
