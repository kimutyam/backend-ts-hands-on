import { err, ok, Result } from 'neverthrow';

const results1: Array<Result<number, never>> = [ok(1), ok(2)];

// 1
const r1 = Result.combine(results1);

const results2: Array<Result<number, Error>> = [
  ok(1),
  err(new Error('err!')),
  ok(2),
];

// 2
const r2 = Result.combine(results2);

console.log(r1, r2);
