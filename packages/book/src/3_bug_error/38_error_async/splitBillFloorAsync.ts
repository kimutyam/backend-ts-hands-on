import { IndivisibleBillError } from '../26_error_custom/indivisibleBillError.js';
import { splitBillAsync } from '../36_error_async/splitBillAsync.js';

const splitBillFloorAsync = (
  bill: number,
  members: number,
): Promise<number> =>
  splitBillAsync(bill, members).catch((reason) => {
    if (reason instanceof IndivisibleBillError) {
      return Promise.resolve(Math.floor(reason.calculated));
    }
    return Promise.reject(reason);
  });

export { splitBillFloorAsync };
