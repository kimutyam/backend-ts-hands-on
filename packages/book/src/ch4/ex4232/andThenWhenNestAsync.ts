import type { ResultAsync } from 'neverthrow';
import { okAsync } from 'neverthrow';

const nestedAsync: ResultAsync<ResultAsync<number, never>, never> = okAsync(
  okAsync(42),
);
// 1
const flattened = nestedAsync.andThen((a) => a);

console.log(flattened);
