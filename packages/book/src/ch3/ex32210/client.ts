import { NumberOfMembersError } from 'ch3/ex3225/numberOfMembersError.js';
import { splitBillFloorAsync } from 'ch3/ex32210/splitBillFloorAsync.js';

await splitBillFloorAsync(100, 1).catch((reason: unknown): Promise<number> => {
  if (reason instanceof NumberOfMembersError) {
    console.log(reason);
  }
  return Promise.resolve(0);
});
