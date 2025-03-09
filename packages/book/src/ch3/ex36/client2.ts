import { IndivisibleBillError } from 'ch3/ex26/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex26/numberOfMembersError.js';
import { splitBillAsync } from 'ch3/ex36/splitBillAsync.js';

await splitBillAsync(100, 1)
  .catch((reason): Promise<number> => {
    if (reason instanceof IndivisibleBillError) {
      return Promise.resolve(Math.floor(reason.calculated));
    }
    return Promise.reject(reason);
  })
  .catch((reason): Promise<number> => {
    if (reason instanceof NumberOfMembersError) {
      console.error(reason);
    }
    return Promise.resolve(0);
  });
