import { IndivisibleBillError } from './indivisibleBillError.js';
import { NumberOfMembersError } from './numberOfMembersError.js';

const splitBill = (bill: number, members: number): number => {
  if (members < 2) {
    throw new NumberOfMembersError(members);
  }
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    throw new IndivisibleBillError(bill, members, calculated);
  }
  return calculated;
};

export { splitBill };
