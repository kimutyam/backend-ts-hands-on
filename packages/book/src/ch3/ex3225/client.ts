import { splitBill } from 'ch3/ex3222/splitBill.js';
import { IndivisibleBillError } from 'ch3/ex3225/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex3225/numberOfMembersError.js';

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
