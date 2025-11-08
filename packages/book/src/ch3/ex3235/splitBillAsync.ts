import type { Result } from '../ex3231/result.js';
import { Failure, Success } from '../ex3231/result.js';
import { IndivisibleBillError } from '../ex3233/indivisibleBillError.js';
import { NumberOfMembersError } from '../ex3233/numberOfMembersError.js';
import type { SplitBillError } from '../ex3233/splitBillError.js';

const splitBillAsync = (
  bill: number,
  members: number,
): Promise<Result<number, SplitBillError>> =>
  new Promise((resolve) => {
    if (members < 2) {
      resolve(Failure(NumberOfMembersError.create(members)));
    }
    const calculated = bill / members;
    if (!Number.isInteger(calculated)) {
      resolve(Failure(IndivisibleBillError.create(bill, members, calculated)));
    }
    resolve(Success(calculated));
  });

export { splitBillAsync };
