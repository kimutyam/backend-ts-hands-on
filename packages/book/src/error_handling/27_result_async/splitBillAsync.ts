import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError';
import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError';
import type { Result } from '../23_result/result';
import { Failure, Success } from '../23_result/result';
import type { SplitBillError } from '../26_add_error_but/splitBillError';
import { BillError } from '../27_error_adt/billError';

export function splitBillAsync(
  bill: number,
  members: number,
): Promise<Result<number, SplitBillError>> {
  return new Promise((resolve) => {
    if (bill <= 0) {
      resolve(Failure(new BillError('勘定は0より大きくしてください', bill)));
    }
    if (members < 2) {
      resolve(Failure(new NumberOfMembersError('2人以上を指定してください', members)));
    }
    const calculated = bill / members;
    if (!Number.isInteger(calculated)) {
      resolve(Failure(new IndivisibleBillError('割り切れません', calculated)));
    }
    resolve(Success(calculated));
  });
}
