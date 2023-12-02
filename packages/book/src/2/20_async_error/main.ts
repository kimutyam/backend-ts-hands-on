import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError';
import { splitBillAsync } from './splitBillAsync';

(async () => {
  await splitBillAsync(100, 1).catch((reason: unknown) => {
    if (reason instanceof IndivisibleBillError) {
      console.log(reason.calculated);
      return Math.floor(reason.calculated);
    }
    return Promise.reject(reason);
  });
})();
