import { err, ok, Result } from 'neverthrow';

const results: [Result<number, never>, Result<string, never>] = [
  ok(1),
  ok('Two'),
];

// Ok([1, 'Two'])
const r1: Result<[number, string], never> = Result.combine(results);

const results1: [Result<number, string>, Result<string, boolean>] = [
  err('oh'),
  err(true),
];

// Err("oh")
const r2: Result<[number, string], string | boolean> = Result.combine(results1);

console.log(r1, r2);
