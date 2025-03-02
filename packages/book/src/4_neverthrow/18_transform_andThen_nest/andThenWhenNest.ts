import type { Result } from 'neverthrow';
import { ok } from 'neverthrow';

const nested: Result<Result<number, never>, never> = ok(
  ok(42),
);

const flattened: Result<number, never> = nested.andThen(
  (a) => a,
);

console.log(flattened);
