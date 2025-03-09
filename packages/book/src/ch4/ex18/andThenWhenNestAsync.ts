import type { ResultAsync } from 'neverthrow';
import { okAsync } from 'neverthrow';

const nestedAsync: ResultAsync<
  ResultAsync<number, never>,
  never
> = okAsync(okAsync(42));

const flattened: ResultAsync<number, never> =
  nestedAsync.andThen((a) => a);

console.log(flattened);
