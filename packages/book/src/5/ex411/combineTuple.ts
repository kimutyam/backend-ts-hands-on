import { err, ok, Result } from 'neverthrow';

import { SomethingError } from '../common/somethingError.js';

const results: [Result<number, never>, Result<string, never>] = [
  ok(1),
  ok('Two'),
];

// Result<[number, string], never>
const r1 = Result.combine(results);

const results1: [Result<never, SomethingError>, Result<never, boolean>] = [
  err(SomethingError.create('err!')),
  err(true),
];

// Result<[never, never], SomethingError | boolean>
const r2 = Result.combine(results1);

console.log(r1, r2);
