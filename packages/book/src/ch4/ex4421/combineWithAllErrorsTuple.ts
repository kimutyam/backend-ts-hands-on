import { SomethingError } from 'ch4/common/somethingError.js';
import { err, ok, Result } from 'neverthrow';

const results: [Result<number, Error>, Result<string, SomethingError>] = [
  ok(1),
  err(SomethingError.create('oh')),
];

const r1 = Result.combineWithAllErrors(results);

console.log(results, r1);
