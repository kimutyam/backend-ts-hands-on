import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError.js';
import { IndivisibleBillError } from './indivisibleBillError.js';
import { splitBill } from './splitBill.js';

try {
  splitBill(100, 1);
} catch (e: unknown) {
  if (e instanceof NumberOfMembersError) {
    console.log(e.members);
    console.error(e.message);
  } else if (e instanceof IndivisibleBillError) {
    console.log(e.calculated);
    console.error(e.message);
  }
}
