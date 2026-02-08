import type { Result, ResultAsync } from 'neverthrow';
import { ok } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare function f1(n: number): Result<number, SomethingError>;
declare function f2(n: number): ResultAsync<string, SomethingError>;
declare function f3(s: string): ResultAsync<string, undefined>;

// Result<number, SomethingError>
const r1 = ok(10).andThen(f1);

// ResultAsync<string, SomethingError>
const ra2 = r1.asyncAndThen(f2);

// ResultAsync<string, SomethingError | undefined>
const ra3 = ra2.andThen(f3);

console.log(ra3);
