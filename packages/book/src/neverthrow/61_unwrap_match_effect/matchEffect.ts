import type { Result } from 'neverthrow';

declare const r1: Result<number, Error>;

const f1 = (n: number): void => console.log(n.toString());
const fe1 = (e: Error): void => console.error(e.message);

r1.match(f1, fe1);
