import { NumberOfMembersError } from '../26_error_custom/numberOfMembersError.js';
import { splitBillFloorAsync } from './splitBillFloorAsync.js';

await splitBillFloorAsync(100, 1).catch((reason): Promise<number> => {
  if (reason instanceof NumberOfMembersError) {
    console.log(reason);
  }
  return Promise.resolve(0);
});
