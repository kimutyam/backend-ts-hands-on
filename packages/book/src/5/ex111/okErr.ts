import { err, ok } from 'neverthrow';

// Ok<{ data: string }, never>
const ok1 = ok({
  data: 'success',
});
ok1.isOk(); // true
ok1.isErr(); // false

// Err<never, number>
const err1 = err(42);
err1.isOk(); // false
err1.isErr(); // true
