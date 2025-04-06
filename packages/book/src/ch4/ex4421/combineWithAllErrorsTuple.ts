import { err, ok, Result } from 'neverthrow';

const results: [Result<number, Error>, Result<string, Error>] = [
  ok(1),
  err(new Error('oh')),
];

const r1 = Result.combineWithAllErrors(results);

console.log(results, r1);
