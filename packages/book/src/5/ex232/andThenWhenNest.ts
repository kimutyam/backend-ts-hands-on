import { ok } from 'neverthrow';

// Result<Result<number, never>, never>
const nested = ok(ok(42));

// Result<number, never>
const flattened = nested.andThen((a) => a);

console.log(flattened);
