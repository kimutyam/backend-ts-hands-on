import { err, ok, Result } from 'neverthrow';

const results1: Array<Result<number, never>> = [
  ok(1),
  ok(2),
];

// Ok([1,2])
const r1: Result<Array<number>, never> = Result.combine(
  results1,
);

const results2: Array<Result<number, string>> = [
  ok(1),
  err('Ohh!'),
  ok(2),
];

// Err("ohh")
const r2: Result<Array<number>, string> = Result.combine(
  results2,
);

console.log(r1, r2);
