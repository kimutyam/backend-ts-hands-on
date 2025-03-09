import type { ResultAsync } from 'neverthrow';

declare const r: ResultAsync<number, Error>;

const r1: Promise<number | boolean> = r.unwrapOr(false);

console.log(r1);
