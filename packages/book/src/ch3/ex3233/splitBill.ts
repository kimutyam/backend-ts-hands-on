import type { Result } from 'ch3/ex3231/result.js';
import { Failure, Success } from 'ch3/ex3231/result.js';
import { IndivisibleBillError } from 'ch3/ex3233/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex3233/numberOfMembersError.js';
import type { SplitBillError } from 'ch3/ex3233/splitBillError.js';

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
