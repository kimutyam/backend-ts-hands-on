import type { Err, Ok } from 'neverthrow';
import { err, ok } from 'neverthrow';

const ok1: Ok<number, never> = ok(42);
ok1.isOk(); // true
ok1.isErr(); // false

const err1: Err<never, string> = err('Error');
err1.isOk(); // false
err1.isErr(); // true
