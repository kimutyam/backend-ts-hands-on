import { IndivisibleBillError } from '../26_error_custom/indivisibleBillError.js';
import { NumberOfMembersError } from '../26_error_custom/numberOfMembersError.js';
import { assertNever } from './assertNever.js';
import type { SplitBillError } from './splitBillError.js';

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
