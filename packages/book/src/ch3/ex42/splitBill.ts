import { IndivisibleBillError } from 'ch3/ex26/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex26/numberOfMembersError.js';
import type { Result } from 'ch3/ex40/result.js';
import { Failure, Success } from 'ch3/ex40/result.js';
import type { SplitBillError } from 'ch3/ex42/splitBillError.js';

const splitBill = (
  bill: number,
  members: number,
): Result<number, SplitBillError> => {
  if (members < 2) {
    return Failure(
      new NumberOfMembersError('2人以上を指定してください', members),
    );
  }
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    return Failure(
      new IndivisibleBillError('割り切れません', bill, members, calculated),
    );
  }
  return Success(calculated);
};

export { splitBill };
