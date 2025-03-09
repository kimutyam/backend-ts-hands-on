import { NumberOfMembersError } from '3_bug_error/26_error_custom/numberOfMembersError.js';
import { splitBillFloorAsync } from '3_bug_error/38_error_async/splitBillFloorAsync.js';

await splitBillFloorAsync(100, 1).catch(
  (reason): Promise<number> => {
    if (reason instanceof NumberOfMembersError) {
      console.log(reason);
    }
    return Promise.resolve(0);
  },
);
