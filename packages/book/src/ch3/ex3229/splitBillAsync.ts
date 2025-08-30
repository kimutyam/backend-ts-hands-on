import { IndivisibleBillError } from 'ch3/ex3225/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex3225/numberOfMembersError.js';

const splitBillAsync = async (bill: number, members: number): Promise<number> =>
  new Promise((resolve, reject) => {
    if (members < 2) {
      reject(new NumberOfMembersError(members));
      return;
    }
    const calculated = bill / members;
    if (!Number.isInteger(calculated)) {
      reject(new IndivisibleBillError(bill, members, calculated));
      return;
    }
    resolve(calculated);
  });

export { splitBillAsync };
