import { IndivisibleBillError } from '../26_error_custom/indivisibleBillError';
import { NumberOfMembersError } from '../26_error_custom/numberOfMembersError';
import { assertNever } from './assertNever';
import type { SplitBillError } from './splitBillError';

const printError = (error: SplitBillError): void => {
  if (error instanceof NumberOfMembersError) {
    console.log(error.members);
    console.error(error.message);
  } else if (error instanceof IndivisibleBillError) {
    console.log(error.bill);
    console.error(error.message);
  } else {
    assertNever(error);
  }
};

export { printError };
