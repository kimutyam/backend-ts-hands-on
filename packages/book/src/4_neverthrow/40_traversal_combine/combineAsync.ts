import { errAsync, okAsync, ResultAsync } from 'neverthrow';

const results: Array<ResultAsync<number, never>> = [
  okAsync(1),
  okAsync(2),
];

const r1: ResultAsync<
  Array<number>,
  never
> = ResultAsync.combine(results);

const results2: Array<ResultAsync<number, string>> = [
  okAsync(1),
  errAsync('Ohh!'),
  okAsync(2),
];

const r2: ResultAsync<
  Array<number>,
  string
> = ResultAsync.combine(results2);

console.log(r1, r2);
