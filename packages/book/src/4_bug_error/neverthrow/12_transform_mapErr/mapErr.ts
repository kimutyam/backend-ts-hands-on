import type { Result } from 'neverthrow';

declare const r: Result<number, Error>;

// 適用する関数
const f = (e: Error): string => e.message;

const r1: Result<number, string> = r.mapErr(f);

console.log(r1);
