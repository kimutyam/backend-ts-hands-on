import { IndivisibleBillError } from '3_bug_error/26_error_custom/indivisibleBillError.js';
import { splitBill } from '3_bug_error/32_error_assertion/splitBill.js';

try {
  splitBill(100, 3);
} catch (e) {
  if (e instanceof IndivisibleBillError) {
    console.log(e.message);
  } else {
    throw e;
  }
}
