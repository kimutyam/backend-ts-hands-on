import type { ResultAsync } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare const ra: ResultAsync<number, SomethingError>;

const f = (a: number): string => a.toString();

// ResultAsync<string, SomethingError>
const ra1 = ra.map(f);

console.log(ra1);
