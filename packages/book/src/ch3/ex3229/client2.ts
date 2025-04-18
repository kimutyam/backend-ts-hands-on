import { IndivisibleBillError } from 'ch3/ex3225/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex3225/numberOfMembersError.js';
import { splitBillAsync } from 'ch3/ex3229/splitBillAsync.js';

await splitBillAsync(100, 1)
  .catch((reason: unknown): Promise<number> => {
    if (reason instanceof IndivisibleBillError) {
      return Promise.resolve(Math.floor(reason.calculated));
    }
    if (reason instanceof Error) {
      return Promise.reject(reason);
    }
    return Promise.reject(new Error(String(reason)));
  })
  .catch((reason: unknown): Promise<number> => {
    if (reason instanceof NumberOfMembersError) {
      console.error(reason);
    }
    return Promise.resolve(0);
  });
