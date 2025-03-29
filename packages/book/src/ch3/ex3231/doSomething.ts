import type { Result } from 'ch3/ex3231/result.js';

declare function doSomething(): Result<number, Error>;

const result = doSomething();

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
