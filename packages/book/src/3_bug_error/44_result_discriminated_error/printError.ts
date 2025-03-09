import { assertNever } from '3_bug_error/42_result/assertNever.js';
import { IndivisibleBillErrorKind } from '3_bug_error/44_result_discriminated_error/indivisibleBillError.js';
import { NumberOfMembersErrorKind } from '3_bug_error/44_result_discriminated_error/numberOfMembersError.js';
import type { SplitBillError } from '3_bug_error/44_result_discriminated_error/splitBillError.js';

const printError = (error: SplitBillError): void => {
  switch (error.kind) {
    case NumberOfMembersErrorKind:
      console.log(error.members);
      console.error(error.message);
      break;
    case IndivisibleBillErrorKind:
      console.log(error.calculated);
      console.error(error.message);
      break;
    default:
      assertNever(error);
  }
};

export { printError };
