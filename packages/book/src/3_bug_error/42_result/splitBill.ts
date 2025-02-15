import { IndivisibleBillError } from '../26_error_custom/indivisibleBillError.js';
import { NumberOfMembersError } from '../26_error_custom/numberOfMembersError.js';
import type { Result } from '../40_result/result.js';
import { Failure, Success } from '../40_result/result.js';
import type { SplitBillError } from './splitBillError.js';

const splitBill = (bill: number, members: number): Result<number, SplitBillError> => {
  if (members < 2) {
    return Failure(new NumberOfMembersError('2人以上を指定してください', members));
  }
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    return Failure(new IndivisibleBillError('割り切れません', bill, members, calculated));
  }
  return Success(calculated);
};

export { splitBill };
