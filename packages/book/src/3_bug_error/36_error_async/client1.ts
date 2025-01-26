import { IndivisibleBillError } from '../26_error_custom/indivisibleBillError.js';
import { splitBillAsync } from './splitBillAsync.js';

(async () => {
  await splitBillAsync(100, 1).catch((reason): Promise<number> => {
    if (reason instanceof IndivisibleBillError) {
      return Promise.resolve(Math.floor(reason.calculated));
    }
    return Promise.reject(reason);
  });
})();
