import type { Result } from '../ex3231/result.js';
import { Failure, Success } from '../ex3231/result.js';
import { IndivisibleBillError } from './indivisibleBillError.js';
import { NumberOfMembersError } from './numberOfMembersError.js';
import type { SplitBillError } from './splitBillError.js';

const splitBill = (
  bill: number,
  members: number,
): Result<number, SplitBillError> => {
  if (members < 2) {
    return Failure(NumberOfMembersError.create(members));
  }
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    return Failure(IndivisibleBillError.create(bill, members, calculated));
  }
  return Success(calculated);
};

export { splitBill };
