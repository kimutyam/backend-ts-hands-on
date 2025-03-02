import { err, ok, Result } from 'neverthrow';

const results: [
  Result<number, boolean>,
  Result<boolean, string>,
] = [ok(1), err('oh')];

const r1: Result<
  [number, boolean],
  Array<string | boolean>
> = Result.combineWithAllErrors(results);

console.log(results, r1);
