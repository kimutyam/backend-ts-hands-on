import type { ResultAsync } from 'neverthrow';
import { errAsync, okAsync } from 'neverthrow';

const f1 = (e: Error): ResultAsync<number, string> => errAsync(e.name);
const f2 = (name: string): ResultAsync<undefined, string> =>
  name === 'RangeError' ? okAsync(undefined) : errAsync(name);

declare const r1: ResultAsync<number, Error>;

const r2 = r1.orElse(f1);
const r3 = r2.orElse(f2);

console.log(r3);
