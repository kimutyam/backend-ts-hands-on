import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError.js';
import { IndivisibleBillError } from './indivisibleBillError.js';

export function splitBill(bill: number, members: number): number {
  if (members < 2) {
    throw new NumberOfMembersError('2人以上を指定してください', members);
  }
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    throw new IndivisibleBillError('割り切れません', calculated);
  }
  return calculated;
}
