import { splitBill } from '../20_error/splitBill.js';
import { IndivisibleBillError } from './indivisibleBillError.js';
import { NumberOfMembersError } from './numberOfMembersError.js';

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
