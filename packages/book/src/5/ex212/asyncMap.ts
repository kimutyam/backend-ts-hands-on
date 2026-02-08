import type { Result } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare const r: Result<string, SomethingError>;
declare function f(a: string): Promise<string>;

// ResultAsync<string, SomethingError>
const ra = r.asyncMap(f);

console.log(ra);
