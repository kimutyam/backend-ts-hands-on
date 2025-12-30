import type { Result } from 'neverthrow';
import { ok } from 'neverthrow';

const nested: Result<Result<number, never>, never> = ok(ok(42));
// 1
const flattened = nested.andThen((a) => a);

console.log(flattened);
