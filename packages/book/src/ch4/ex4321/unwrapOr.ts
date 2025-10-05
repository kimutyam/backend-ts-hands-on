import type { SomethingError } from 'ch4/common/somethingError.js';
import type { Result } from 'neverthrow';

declare const r1: Result<number, SomethingError>;

// 1
const r2 = r1.unwrapOr(false);

console.log(r2);
