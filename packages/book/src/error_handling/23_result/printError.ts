import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError';
import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError';
import type { SplitBillError } from './splitBillError';

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
