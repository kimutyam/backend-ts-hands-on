import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError';
import { splitBill } from './splitBill';

try {
  splitBill(100, 1);
} catch (e: unknown) {
  if (e instanceof NumberOfMembersError) {
    console.log(e.members);
    console.error(e.message);
  }
}
