import { SomethingError } from 'ch4/common/somethingError.js';
import { errAsync, okAsync, ResultAsync } from 'neverthrow';

const results: Array<ResultAsync<number, never>> = [okAsync(1), okAsync(2)];

// 1
const r1 = ResultAsync.combine(results);

const results2: Array<ResultAsync<number, SomethingError>> = [
  okAsync(1),
  errAsync(SomethingError.create('err!')),
  okAsync(2),
];

// 2
const r2 = ResultAsync.combine(results2);

// 3
const awaited1 = await r1;

// 4
const awaited2 = await r2.mapErr((e) => e.message);

console.log(awaited1, awaited2);
