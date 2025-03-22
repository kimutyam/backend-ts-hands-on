import type { Result } from 'ch3/ex40/result.js';
import { Failure, Success } from 'ch3/ex40/result.js';
import type { SplitBillError } from 'ch3/ex42/splitBillError.js';
import { IndivisibleBillError } from 'ch3/ex3225/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex3225/numberOfMembersError.js';

const splitBill = (
  bill: number,
  members: number,
): Result<number, SplitBillError> => {
  if (members < 2) {
    return Failure(new NumberOfMembersError(members));
  }
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    return Failure(new IndivisibleBillError(bill, members, calculated));
  }
  return Success(calculated);
};

export { splitBill };
