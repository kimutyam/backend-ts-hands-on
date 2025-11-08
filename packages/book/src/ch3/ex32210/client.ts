import { NumberOfMembersError } from '../ex3225/numberOfMembersError.js';
import { splitBillFloorAsync } from './splitBillFloorAsync.js';

await splitBillFloorAsync(100, 1).catch((reason: unknown): Promise<number> => {
  if (reason instanceof NumberOfMembersError) {
    console.log(reason);
  }
  return Promise.resolve(0);
});
