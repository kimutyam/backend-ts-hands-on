import type { ResultAsync } from 'neverthrow';

declare const r: ResultAsync<number, Error>;

// 適用する関数
const f = (a: number): string => a.toString();

const r1: ResultAsync<string, Error> = r.map(f);

console.log(r1);
