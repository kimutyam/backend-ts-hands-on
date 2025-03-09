import { splitBill } from '3_bug_error/30_error_assertion/splitBill.js';

try {
  splitBill(100, 0);
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message);
  } else {
    throw e;
  }
}
