import { IndivisibleBillError } from '3_bug_error/26_error_custom/indivisibleBillError.js';
import { NumberOfMembersError } from '3_bug_error/26_error_custom/numberOfMembersError.js';
import type { Result } from '3_bug_error/40_result/result.js';
import {
  Failure,
  Success,
} from '3_bug_error/40_result/result.js';
import type { SplitBillError } from '3_bug_error/42_result/splitBillError.js';

const splitBill = (
  bill: number,
  members: number,
): Result<number, SplitBillError> => {
  if (members < 2) {
    return Failure(
      new NumberOfMembersError(
        '2人以上を指定してください',
        members,
      ),
    );
  }
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    return Failure(
      new IndivisibleBillError(
        '割り切れません',
        bill,
        members,
        calculated,
      ),
    );
  }
  return Success(calculated);
};

export { splitBill };
