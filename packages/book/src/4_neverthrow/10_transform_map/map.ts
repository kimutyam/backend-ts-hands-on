import type { Result } from 'neverthrow';

declare const r: Result<number, Error>;

// 適用する関数
const f = (a: number): string => a.toString();

const r1: Result<string, Error> = r.map(f);

console.log(r1);
