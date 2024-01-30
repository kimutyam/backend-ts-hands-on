import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

const ok1: Result<number, never> = ok(42);
const err1: Result<never, string> = err('Error');

console.log(ok1, err1);
