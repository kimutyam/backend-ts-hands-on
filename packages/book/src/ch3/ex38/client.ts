import { splitBillFloorAsync } from 'ch3/ex38/splitBillFloorAsync.js';
import { NumberOfMembersError } from 'ch3/ex3225/numberOfMembersError.js';

await splitBillFloorAsync(100, 1).catch((reason: unknown): Promise<number> => {
  if (reason instanceof NumberOfMembersError) {
    console.log(reason);
  }
  return Promise.resolve(0);
});
