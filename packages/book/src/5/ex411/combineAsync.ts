import { errAsync, okAsync, ResultAsync } from 'neverthrow';

import { SomethingError } from '../common/somethingError.js';

// Array<ResultAsync<number, never>>
const results = [okAsync(1), okAsync(2)];

// ResultAsync<Array<number>, never>
const r1 = ResultAsync.combine(results);

// Array<ResultAsync<number, SomethingError>>
const results2 = [
  okAsync(1),
  errAsync(SomethingError.create('err!')),
  okAsync(2),
];

// ResultAsync<Array<number>, SomethingError>
const r2 = ResultAsync.combine(results2);

console.log(r1, r2);
