import { IndivisibleBillError } from './indivisibleBillError.js';
import { NumberOfMembersError } from './numberOfMembersError.js';

const splitBill = (bill: number, members: number): number => {
  if (members < 2) {
    throw new NumberOfMembersError('2人以上を指定してください', members);
  }
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    throw new IndivisibleBillError('割り切れません', bill, members, calculated);
  }
  return calculated;
};

export { splitBill };
