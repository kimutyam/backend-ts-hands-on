import { err, ok } from 'neverthrow';

// 1
const ok1 = ok({
  data: 'success',
});
ok1.isOk(); // true
ok1.isErr(); // false

// 2
const err1 = err(42);
err1.isOk(); // false
err1.isErr(); // true
