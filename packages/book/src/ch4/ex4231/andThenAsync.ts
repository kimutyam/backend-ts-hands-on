import type { ResultAsync } from 'neverthrow';
import { errAsync, okAsync } from 'neverthrow';

const f1 = (n: number): ResultAsync<number, Error> => okAsync(n * 2);
const f2 = (n: number): ResultAsync<string, Error> => okAsync(n.toString());
const f3 = (s: string): ResultAsync<string, undefined> =>
  s === 'NaN' ? errAsync(undefined) : okAsync(s);

const r1: ResultAsync<number, Error> = okAsync(10).andThen(f1);
const r2: ResultAsync<string, Error> = r1.andThen(f2);
const r3: ResultAsync<string, Error | undefined> = r2.andThen(f3);

console.log(r3);
