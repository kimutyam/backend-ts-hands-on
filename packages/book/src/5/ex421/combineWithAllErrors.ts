import { err, ok, Result } from 'neverthrow';

import { SomethingError } from '../common/somethingError.js';

// Array<Result<number, SomethingError>>
const results = [
  ok(1),
  err(SomethingError.create('oh')),
  ok(2),
  err(SomethingError.create('my')),
  err(SomethingError.create('god')),
];

// Result<Array<number>, Array<SomethingError>>
const r1 = Result.combineWithAllErrors(results);

console.log(results, r1);
