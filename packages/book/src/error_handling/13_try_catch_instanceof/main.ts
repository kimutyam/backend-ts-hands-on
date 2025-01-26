import { splitBill } from '../11_split_bill_error/splitBill.js';

try {
  splitBill(100, 1);
} catch (e) {
  if (e instanceof Error) {
    console.log(e.name, e.message, e.stack);
  }
}
