import type { Result } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare const r: Result<number, SomethingError>;

// 1
const f = (a: number): string => a.toString();

// 2
const r1 = r.map(f);

console.log(r1);
