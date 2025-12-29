import type { Result } from '../exa3231/result.js';
import { Err, Ok } from '../exa3231/result.js';
import { IndivisibleBillError } from './indivisibleBillError.js';
import { NumberOfMembersError } from './numberOfMembersError.js';

const splitBill = (
  bill: number,
  members: number,
): Result<number, NumberOfMembersError | IndivisibleBillError> => {
  if (members < 2) {
    return Err(NumberOfMembersError.create(members));
  }
  const calculated = bill / members;
  if (!Number.isInteger(calculated)) {
    return Err(IndivisibleBillError.create(bill, members, calculated));
  }
  return Ok(calculated);
};

export { splitBill };
