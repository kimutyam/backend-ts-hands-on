import type { Result } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare const r: Result<number, SomethingError>;
const f = (a: number): string => a.toString();

// Result<string, SomethingError>
const r1 = r.map(f);

console.log(r1);
