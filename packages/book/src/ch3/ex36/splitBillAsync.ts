import { IndivisibleBillError } from 'ch3/ex26/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex26/numberOfMembersError.js';

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
