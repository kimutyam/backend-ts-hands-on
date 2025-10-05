import { SomethingError } from 'ch4/common/somethingError.js';
import { err, ok, Result } from 'neverthrow';

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
