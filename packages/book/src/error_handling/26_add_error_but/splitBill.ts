import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError';
import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError';
import type { Result } from '../23_result/result';
import { Failure, Success } from '../23_result/result';
import { BillError } from './billError';
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
