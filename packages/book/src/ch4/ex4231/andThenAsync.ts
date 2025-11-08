import type { ResultAsync } from 'neverthrow';
import { errAsync, okAsync } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

const f1 = (n: number): ResultAsync<number, SomethingError> => okAsync(n * 2);
const f2 = (n: number): ResultAsync<string, SomethingError> =>
  okAsync(n.toString());
const f3 = (s: string): ResultAsync<string, undefined> =>
  s === 'NaN' ? errAsync(undefined) : okAsync(s);

const r1: ResultAsync<number, SomethingError> = okAsync(10).andThen(f1);
const r2: ResultAsync<string, SomethingError> = r1.andThen(f2);
const r3: ResultAsync<string, SomethingError | undefined> = r2.andThen(f3);

console.log(r3);
