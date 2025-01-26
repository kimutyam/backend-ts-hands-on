import type { Result } from './result.js';
import { Success } from './result.js';

function foo(): Result<number, Error> {
  return Success(42);
}

const result = foo();

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
