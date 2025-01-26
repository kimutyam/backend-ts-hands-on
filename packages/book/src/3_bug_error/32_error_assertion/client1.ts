import { IndivisibleBillError } from '../26_error_custom/indivisibleBillError.js';
import { splitBill } from './splitBill.js';

try {
  splitBill(100, 3);
} catch (e) {
  if (e instanceof IndivisibleBillError) {
    console.log(e.message);
  } else {
    throw e;
  }
}
