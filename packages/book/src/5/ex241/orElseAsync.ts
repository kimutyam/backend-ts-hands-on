import type { ResultAsync } from 'neverthrow';

import type { SomethingError } from '../common/somethingError.js';

declare function f1(e: SomethingError): ResultAsync<number, string>;
declare function f2(name: string): ResultAsync<undefined, string>;

declare const ra1: ResultAsync<number, SomethingError>;

// ResultAsync<number, string>
const ra2 = ra1.orElse(f1);
// ResultAsync<number | undefined, string>
const ra3 = ra2.orElse(f2);

console.log(ra3);
