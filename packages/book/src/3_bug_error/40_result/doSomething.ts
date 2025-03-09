import type { Result } from '3_bug_error/40_result/result.js';

declare function doSomething(): Result<number, Error>;

const result = doSomething();

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
