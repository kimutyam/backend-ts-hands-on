import { IndivisibleBillError } from '3_bug_error/26_error_custom/indivisibleBillError.js';
import { splitBillAsync } from '3_bug_error/36_error_async/splitBillAsync.js';

await splitBillAsync(100, 1).catch(
  (reason): Promise<number> => {
    if (reason instanceof IndivisibleBillError) {
      return Promise.resolve(Math.floor(reason.calculated));
    }
    return Promise.reject(reason);
  },
);
