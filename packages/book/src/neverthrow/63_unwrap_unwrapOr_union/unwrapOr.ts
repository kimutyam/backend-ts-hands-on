import type { Result } from 'neverthrow';

declare const r1: Result<number, Error>;

const r2: number | boolean = r1.unwrapOr(false);

console.log(r2);
