import type { Result } from './result.js';

declare function doSomething(): Result<number, Error>;

const result = doSomething();

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
