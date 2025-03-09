import { IndivisibleBillError } from '3_bug_error/26_error_custom/indivisibleBillError.js';
import { NumberOfMembersError } from '3_bug_error/26_error_custom/numberOfMembersError.js';
import { assertNever } from '3_bug_error/42_result/assertNever.js';
import type { SplitBillError } from '3_bug_error/42_result/splitBillError.js';

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
