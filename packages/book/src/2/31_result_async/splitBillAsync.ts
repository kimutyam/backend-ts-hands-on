import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError';
import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError';
import type { Result } from '../23_result/result';
import { Failure, Success } from '../23_result/result';
import type { SplitBillError } from '../26_add_error_but/splitBillError';

export function splitBillAsync(
  bill: number,
  members: number,
): Promise<Result<SplitBillError, number>> {
  return new Promise((resolve) => {
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
