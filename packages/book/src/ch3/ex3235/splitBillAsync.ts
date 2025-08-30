import { IndivisibleBillError } from 'ch3/ex3225/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex3225/numberOfMembersError.js';
import type { Result } from 'ch3/ex3231/result.js';
import { Failure, Success } from 'ch3/ex3231/result.js';
import type { SplitBillError } from 'ch3/ex3233/splitBillError.js';

const splitBillAsync = (
  bill: number,
  members: number,
): Promise<Result<number, SplitBillError>> =>
  new Promise((resolve) => {
    let result: Result<number, SplitBillError>;
    if (members < 2) {
      result = Failure(new NumberOfMembersError(members));
    } else {
      const calculated = bill / members;
      result = Number.isInteger(calculated)
        ? Success(calculated)
        : Failure(new IndivisibleBillError(bill, members, calculated));
    }
    resolve(result);
  });

export { splitBillAsync };
