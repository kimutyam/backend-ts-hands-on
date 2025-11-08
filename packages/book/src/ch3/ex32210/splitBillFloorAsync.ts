import { IndivisibleBillError } from '../ex3225/indivisibleBillError.js';
import { splitBillAsync } from '../ex3229/splitBillAsync.js';

const splitBillFloorAsync = (bill: number, members: number): Promise<number> =>
  splitBillAsync(bill, members).catch((reason: unknown) => {
    if (reason instanceof IndivisibleBillError) {
      return Promise.resolve(Math.floor(reason.calculated));
    }
    if (reason instanceof Error) {
      return Promise.reject(reason);
    }
    return Promise.reject(new Error(String(reason)));
  });

export { splitBillFloorAsync };
