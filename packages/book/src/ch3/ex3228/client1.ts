import { IndivisibleBillError } from 'ch3/ex3225/indivisibleBillError.js';
import { splitBill } from 'ch3/ex3228/splitBill.js';

try {
  splitBill(100, 3);
} catch (e) {
  if (e instanceof IndivisibleBillError) {
    console.log(e.message);
  } else {
    throw e;
  }
}
