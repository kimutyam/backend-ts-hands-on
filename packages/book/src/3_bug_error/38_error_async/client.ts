import { NumberOfMembersError } from '../26_error_custom/numberOfMembersError';
import { splitBillFloorAsync } from './splitBillFloorAsync';

(async () => {
  await splitBillFloorAsync(100, 1).catch((reason): Promise<number> => {
    if (reason instanceof NumberOfMembersError) {
      console.log(reason);
    }
    return Promise.resolve(0);
  });
})();
