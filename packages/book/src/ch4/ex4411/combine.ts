import { err, ok, Result } from 'neverthrow';

import { SomethingError } from '../common/somethingError.js';

const results1: Array<Result<number, never>> = [ok(1), ok(2)];

// 1
const r1 = Result.combine(results1);

const results2: Array<Result<number, SomethingError>> = [
  ok(1),
  err(SomethingError.create('err!')),
  ok(2),
];

// 2
const r2 = Result.combine(results2);

console.log(r1, r2);
