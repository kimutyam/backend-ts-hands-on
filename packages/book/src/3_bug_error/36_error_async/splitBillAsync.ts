import { IndivisibleBillError } from '../26_error_custom/indivisibleBillError';
import { NumberOfMembersError } from '../26_error_custom/numberOfMembersError';

const splitBillAsync = (bill: number, members: number): Promise<number> =>
  new Promise((resolve, reject) => {
    if (members < 2) {
      reject(new NumberOfMembersError('2人以上を指定してください', members));
    }
    const calculated = bill / members;
    if (!Number.isInteger(calculated)) {
      reject(new IndivisibleBillError('割り切れません', bill, members, calculated));
    }
    resolve(calculated);
  });

export { splitBillAsync };