import type { Result } from '../ex231/result.js';
import { Failure, Success } from '../ex231/result.js';
import { IndivisibleBillError } from '../ex233/indivisibleBillError.js';
import { NumberOfMembersError } from '../ex233/numberOfMembersError.js';
import type { SplitBillError } from '../ex233/splitBillError.js';

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
