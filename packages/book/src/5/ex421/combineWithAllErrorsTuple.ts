import { err, ok, Result } from 'neverthrow';

import { SomethingError } from '../common/somethingError.js';

const results: [
  Result<number, never>,
  Result<string, never>,
  Result<string, SomethingError>,
] = [ok(1), ok('str'), err(SomethingError.create('oh'))];

// Result<[number, string, string], Array<SomethingError>>
const r1 = Result.combineWithAllErrors(results);

console.log(results, r1);
