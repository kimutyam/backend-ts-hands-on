import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError.js';
import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError.js';
import type { SplitBillError } from './splitBillError.js';

export function printError(error: SplitBillError): void {
  if (error instanceof NumberOfMembersError) {
    console.log(error.members);
    console.error(error.message);
  } else if (error instanceof IndivisibleBillError) {
    console.log(error.calculated);
    console.error(error.message);
  } else {
    console.error('unexpected');
  }
}
