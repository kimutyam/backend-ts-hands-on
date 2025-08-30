import { NumberOfMembersError } from 'ch3/ex3225/numberOfMembersError.js';
import { splitBillFloorAsync } from 'ch3/ex32210/splitBillFloorAsync.js';

await splitBillFloorAsync(100, 1).catch((reason: unknown): number => {
  if (reason instanceof NumberOfMembersError) {
    console.log(reason);
  }
  return 0;
});
