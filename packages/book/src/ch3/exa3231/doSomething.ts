import type { Result } from './result.js';
import type { SomethingError } from './somethingError.js';

declare function doSomething(): Result<number, SomethingError>;

const result = doSomething();

if (result.ok) {
  console.log(result.data);
} else {
  console.error(result.error);
}
