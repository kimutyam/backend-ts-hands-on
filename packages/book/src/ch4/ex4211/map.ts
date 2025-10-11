import type { SomethingError } from 'ch4/common/somethingError.js';
import type { Result } from 'neverthrow';

declare const r: Result<number, SomethingError>;

// 1
const f = (a: number): string => a.toString();

// 2
const r1 = r.map(f);

console.log(r1);
