import { IndivisibleBillError } from '3_bug_error/26_error_custom/indivisibleBillError.js';
import { NumberOfMembersError } from '3_bug_error/26_error_custom/numberOfMembersError.js';

const splitBillAsync = (
  bill: number,
  members: number,
): Promise<number> =>
  new Promise((resolve, reject) => {
    if (members < 2) {
      reject(
        new NumberOfMembersError(
          '2人以上を指定してください',
          members,
        ),
      );
    }
    const calculated = bill / members;
    if (!Number.isInteger(calculated)) {
      reject(
        new IndivisibleBillError(
          '割り切れません',
          bill,
          members,
          calculated,
        ),
      );
    }
    resolve(calculated);
  });

export { splitBillAsync };
