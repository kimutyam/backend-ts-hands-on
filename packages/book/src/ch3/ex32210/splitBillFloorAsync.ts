import { IndivisibleBillError } from 'ch3/ex3225/indivisibleBillError.js';
import { splitBillAsync } from 'ch3/ex3229/splitBillAsync.js';

const splitBillFloorAsync = (bill: number, members: number): Promise<number> =>
  splitBillAsync(bill, members).catch((reason: unknown): number => {
    if (reason instanceof IndivisibleBillError) {
      return Math.floor(reason.calculated);
    }
    if (reason instanceof Error) {
      throw reason;
    }
    throw new Error(String(reason));
  });

export { splitBillFloorAsync };
