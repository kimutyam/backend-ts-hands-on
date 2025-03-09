import { IndivisibleBillError } from 'ch3/ex26/indivisibleBillError.js';
import { splitBillAsync } from 'ch3/ex36/splitBillAsync.js';

const splitBillFloorAsync = (bill: number, members: number): Promise<number> =>
  splitBillAsync(bill, members).catch((reason) => {
    if (reason instanceof IndivisibleBillError) {
      return Promise.resolve(Math.floor(reason.calculated));
    }
    return Promise.reject(reason);
  });

export { splitBillFloorAsync };
