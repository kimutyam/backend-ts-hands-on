import { IndivisibleBillError } from '../ex3225/indivisibleBillError.js';
import { NumberOfMembersError } from '../ex3225/numberOfMembersError.js';

const splitBillAsync = (bill: number, members: number): Promise<number> =>
  new Promise((resolve, reject) => {
    if (members < 2) {
      reject(new NumberOfMembersError(members));
    }
    const calculated = bill / members;
    if (!Number.isInteger(calculated)) {
      reject(new IndivisibleBillError(bill, members, calculated));
    }
    resolve(calculated);
  });

export { splitBillAsync };
