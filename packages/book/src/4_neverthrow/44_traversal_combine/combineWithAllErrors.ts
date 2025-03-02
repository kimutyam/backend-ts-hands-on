import { err, ok, Result } from 'neverthrow';

const r1: Array<Result<number, string>> = [
  ok(1),
  err('oh'),
  ok(2),
  err('my'),
  err('god'),
];

const r2: Result<
  Array<number>,
  Array<string>
> = Result.combineWithAllErrors(r1);

console.log(r1, r2);
