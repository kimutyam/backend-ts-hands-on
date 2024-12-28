import type { Result } from 'neverthrow';

declare const r: Result<number, Error>;

const r1: number | boolean = r.unwrapOr(false);

console.log(r1);
