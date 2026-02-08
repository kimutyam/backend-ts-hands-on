import { errAsync, okAsync, ResultAsync } from 'neverthrow';

import { SomethingError } from '../common/somethingError.js';

// Array<ResultAsync<number, SomethingError>>
const results = [
  okAsync(1),
  errAsync(SomethingError.create('oh')),
  okAsync(2),
  errAsync(SomethingError.create('my')),
  errAsync(SomethingError.create('god')),
];

// ResultAsync<Array<number>, Array<SomethingError>>
const r1 = ResultAsync.combineWithAllErrors(results);

console.log(r1);
