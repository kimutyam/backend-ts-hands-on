import { err, ok, Result } from 'neverthrow';

import { SomethingError } from '../common/somethingError.js';

const results: Array<Result<number, SomethingError>> = [
  ok(1),
  err(SomethingError.create('oh')),
  ok(2),
  err(SomethingError.create('my')),
  err(SomethingError.create('god')),
];

// 1
const r1 = Result.combineWithAllErrors(results);

console.log(results, r1);
