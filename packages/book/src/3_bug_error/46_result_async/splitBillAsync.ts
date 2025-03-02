import { IndivisibleBillError } from '../26_error_custom/indivisibleBillError.js';
import { NumberOfMembersError } from '../26_error_custom/numberOfMembersError.js';
import type { Result } from '../40_result/result.js';
import { Failure, Success } from '../40_result/result.js';
import type { SplitBillError } from '../42_result/splitBillError.js';

const splitBillAsync = (
  bill: number,
  members: number,
): Promise<Result<number, SplitBillError>> =>
  new Promise((resolve) => {
    if (members < 2) {
      resolve(
        Failure(
          new NumberOfMembersError(
            '2人以上を指定してください',
            members,
          ),
        ),
      );
    }
    const calculated = bill / members;
    if (!Number.isInteger(calculated)) {
      resolve(
        Failure(
          new IndivisibleBillError(
            '割り切れません',
            bill,
            members,
            calculated,
          ),
        ),
      );
    }
    resolve(Success(calculated));
  });

export { splitBillAsync };
