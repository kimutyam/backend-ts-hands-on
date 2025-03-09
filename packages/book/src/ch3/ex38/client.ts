import { NumberOfMembersError } from 'ch3/ex26/numberOfMembersError.js';
import { splitBillFloorAsync } from 'ch3/ex38/splitBillFloorAsync.js';

await splitBillFloorAsync(100, 1).catch((reason): Promise<number> => {
  if (reason instanceof NumberOfMembersError) {
    console.log(reason);
  }
  return Promise.resolve(0);
});
