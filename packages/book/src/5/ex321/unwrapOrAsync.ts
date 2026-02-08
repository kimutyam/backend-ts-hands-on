import type { ResultAsync } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare const r1: ResultAsync<number, SomethingError>;

// Promise<number | false>
const r2 = r1.unwrapOr(false);

console.log(r2);
