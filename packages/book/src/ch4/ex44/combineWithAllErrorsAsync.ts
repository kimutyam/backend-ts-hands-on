import { errAsync, okAsync, ResultAsync } from 'neverthrow';

const results: Array<ResultAsync<number, string>> = [
  okAsync(1),
  errAsync('oh'),
  okAsync(2),
  errAsync('my'),
  errAsync('god'),
];

const r1: ResultAsync<
  Array<number>,
  Array<string>
> = ResultAsync.combineWithAllErrors(results);

console.log(r1);
