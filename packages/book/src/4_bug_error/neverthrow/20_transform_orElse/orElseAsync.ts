import type { ResultAsync } from 'neverthrow';
import { errAsync, okAsync } from 'neverthrow';

declare const r: ResultAsync<number, Error>;

// 適用する関数1
const f1 = (e: Error): ResultAsync<number, string> => errAsync(e.message);
// 適用する関数2
const f2 = (e: Error): ResultAsync<undefined, string> =>
  e.name === 'RangeError' ? okAsync(undefined) : errAsync(e.message);

const r1: ResultAsync<number, string> = r.orElse(f1);
const r2: ResultAsync<number | undefined, string> = r.orElse(f2);

console.log(r1, r2);
