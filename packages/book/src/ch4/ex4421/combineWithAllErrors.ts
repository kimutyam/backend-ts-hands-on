import { err, ok, Result } from 'neverthrow';

const results: Array<Result<number, Error>> = [
  ok(1),
  err(new Error('oh')),
  ok(2),
  err(new Error('my')),
  err(new Error('god')),
];

// 1
const r1 = Result.combineWithAllErrors(results);

console.log(results, r1);
