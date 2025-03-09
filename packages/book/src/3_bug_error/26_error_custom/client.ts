import { splitBill } from '3_bug_error/20_error/splitBill.js';
import { IndivisibleBillError } from '3_bug_error/26_error_custom/indivisibleBillError.js';
import { NumberOfMembersError } from '3_bug_error/26_error_custom/numberOfMembersError.js';

try {
  splitBill(100, 1);
} catch (e) {
  if (e instanceof NumberOfMembersError) {
    console.log(e.message, e.members);
  } else if (e instanceof IndivisibleBillError) {
    console.log(e.message, e.bill, e.members, e.calculated);
  } else {
    throw e;
  }
}
