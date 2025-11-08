import { err, ok, Result } from 'neverthrow';

import { SomethingError } from '../common/somethingError.js';

const results: [Result<number, Error>, Result<string, SomethingError>] = [
  ok(1),
  err(SomethingError.create('oh')),
];

const r1 = Result.combineWithAllErrors(results);

console.log(results, r1);
