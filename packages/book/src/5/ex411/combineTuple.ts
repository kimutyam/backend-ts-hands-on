import { err, ok, Result } from 'neverthrow';

const results: [Result<number, never>, Result<string, never>] = [
  ok(1),
  ok('Two'),
];

// 1
const r1 = Result.combine(results);

const results1: [Result<number, Error>, Result<string, boolean>] = [
  err(new Error('err!')),
  err(true),
];

// 2
const r2 = Result.combine(results1);

console.log(r1, r2);
