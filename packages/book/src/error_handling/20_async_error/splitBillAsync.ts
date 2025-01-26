import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError.js';
import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError.js';

export async function splitBillAsync(bill: number, members: number): Promise<number> {
  return new Promise((resolve, reject) => {
    if (members < 2) {
      reject(new NumberOfMembersError('2人以上を指定してください', members));
    }
    const calculated = bill / members;
    if (!Number.isInteger(calculated)) {
      reject(new IndivisibleBillError('割り切れません', calculated));
    }
    resolve(calculated);
  });
}
