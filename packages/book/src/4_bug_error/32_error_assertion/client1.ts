import { IndivisibleBillError } from '../26_error_custom/indivisibleBillError';
import { splitBill } from './splitBill';

try {
  splitBill(100, 3);
} catch (e) {
  if (e instanceof IndivisibleBillError) {
    console.log(e.message);
  } else {
    throw e;
  }
}
