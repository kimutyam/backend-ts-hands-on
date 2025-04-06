import { errAsync, okAsync, ResultAsync } from 'neverthrow';

const results: Array<ResultAsync<number, Error>> = [
  okAsync(1),
  errAsync(new Error('oh')),
  okAsync(2),
  errAsync(new Error('my')),
  errAsync(new Error('god')),
];

// 1
const r1 = ResultAsync.combineWithAllErrors(results);

console.log(r1);
