import { err, ok, Result } from 'neverthrow';

import { SomethingError } from '../common/somethingError.js';

// Array<Result<number, never>>
const results1 = [ok(1), ok(2)];

// Result<Array<number>, never>
const r1 = Result.combine(results1);

// Array<Result<number, SomethingError>>
const results2 = [ok(1), err(SomethingError.create('err!')), ok(2)];

// Result<Array<number>, SomethingError>
const r2 = Result.combine(results2);

console.log(r1, r2);
