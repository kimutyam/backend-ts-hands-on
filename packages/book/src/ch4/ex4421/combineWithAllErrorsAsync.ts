import { SomethingError } from 'ch4/common/somethingError.js';
import { errAsync, okAsync, ResultAsync } from 'neverthrow';

const results: Array<ResultAsync<number, SomethingError>> = [
  okAsync(1),
  errAsync(SomethingError.create('oh')),
  okAsync(2),
  errAsync(SomethingError.create('my')),
  errAsync(SomethingError.create('god')),
];

// 1
const r1 = ResultAsync.combineWithAllErrors(results);

console.log(r1);
