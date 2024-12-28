import type { ResultAsync } from 'neverthrow';

declare const r: ResultAsync<number, Error>;

// 適用する関数
const f = (e: Error): string => e.message;

const r1: ResultAsync<number, string> = r.mapErr(f);

console.log(r1);
