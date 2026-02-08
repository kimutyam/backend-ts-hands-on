import type { Result } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare const r1: Result<number, SomethingError>;

// number | false
const r2 = r1.unwrapOr(false);

console.log(r2);
