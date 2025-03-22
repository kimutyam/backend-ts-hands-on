import { IndivisibleBillError } from 'ch3/ex3225/indivisibleBillError.js';
import { splitBillAsync } from 'ch3/ex3229/splitBillAsync.js';

await splitBillAsync(100, 1).catch((reason): Promise<number> => {
  if (reason instanceof IndivisibleBillError) {
    return Promise.resolve(Math.floor(reason.calculated));
  }
  return Promise.reject(reason);
});
