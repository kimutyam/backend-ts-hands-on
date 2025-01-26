import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError.js';
import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError.js';
import { splitBillAsync } from '../20_async_error/splitBillAsync.js';

async function splitBillFloor(bill: number, members: number): Promise<number> {
  return splitBillAsync(bill, members).catch((reason: unknown) => {
    if (reason instanceof IndivisibleBillError) {
      console.log(reason.calculated);
      return Math.floor(reason.calculated);
    }
    return Promise.reject(reason);
  });
}

(async () => {
  await splitBillFloor(100, 1).catch((reason: unknown) => {
    if (reason instanceof NumberOfMembersError) {
      console.log(reason);
    }
    return 0;
  });
})();
