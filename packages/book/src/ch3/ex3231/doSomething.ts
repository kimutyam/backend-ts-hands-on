import type { Result } from 'ch3/ex3231/result.js';
import type { SomethingError } from 'ch3/ex3231/somethingError.js';

declare function doSomething(): Result<number, SomethingError>;

const result = doSomething();

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
