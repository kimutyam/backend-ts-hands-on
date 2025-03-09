import { IndivisibleBillError } from 'ch3/ex26/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex26/numberOfMembersError.js';
import type { Result } from 'ch3/ex40/result.js';
import { Failure, Success } from 'ch3/ex40/result.js';
import type { SplitBillError } from 'ch3/ex42/splitBillError.js';

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
