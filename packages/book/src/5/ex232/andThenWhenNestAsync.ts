import type { ResultAsync } from 'neverthrow';

declare const nestedAsync: ResultAsync<ResultAsync<number, never>, never>;

// ResultAsync<number, never>
const flattened = nestedAsync.andThen((a) => a);

console.log(flattened);
