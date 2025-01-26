import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError.js';
import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError.js';
import type { Result } from '../23_result/result.js';
import { Failure, Success } from '../23_result/result.js';
import { BillError } from './billError.js';
import type { SplitBillError } from './splitBillError.js';

export function splitBill(bill: number, members: number): Result<number, SplitBillError> {
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
