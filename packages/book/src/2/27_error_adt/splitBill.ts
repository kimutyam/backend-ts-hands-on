import type { Result } from '../23_result/result';
import { Failure, Success } from '../23_result/result';
import { BillError } from './billError';
import { IndivisibleBillError } from './indivisibleBillError';
import { NumberOfMembersError } from './numberOfMembersError';
import type { SplitBillError } from './splitBillError';

export function splitBill(bill: number, members: number): Result<SplitBillError, number> {
  if (bill <= 0) {
    return Failure(new BillError('勘定は0より大きくしてください', bill));
  }
  if (members < 2) {
    return Failure(new NumberOfMembersError('2人以上を指定してください', members));
  }
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    return Failure(new IndivisibleBillError('割り切れません', calculated));
  }
  return Success(calculated);
}
