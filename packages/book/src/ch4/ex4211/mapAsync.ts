import type { SomethingError } from 'ch4/common/somethingError.js';
import type { ResultAsync } from 'neverthrow';

declare const r: ResultAsync<number, SomethingError>;

// 1
const f = (a: number): string => a.toString();

// 2
const r1 = r.map(f);

console.log(r1);
