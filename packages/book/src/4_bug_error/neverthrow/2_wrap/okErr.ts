import type { Err, Ok } from 'neverthrow';
import { err, ok } from 'neverthrow';

const ok1: Ok<{ data: string }, never> = ok({ data: 'success' });
ok1.isOk(); // true
ok1.isErr(); // false

const err1: Err<never, number> = err(42);
err1.isOk(); // false
err1.isErr(); // true
