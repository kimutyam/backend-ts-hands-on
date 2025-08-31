import { assertNever } from 'ch3/ex3233/assertNever.js';
import { IndivisibleBillErrorKind } from 'ch3/ex3234/indivisibleBillError.js';
import { NumberOfMembersErrorKind } from 'ch3/ex3234/numberOfMembersError.js';
import type { SplitBillError } from 'ch3/ex3234/splitBillError.js';

const printError = (error: SplitBillError): void => {
  switch (error.kind) {
    case NumberOfMembersErrorKind:
      console.log(error.message, error.members);
      break;
    case IndivisibleBillErrorKind:
      console.log(error.message, error.bill, error.members, error.calculated);
      break;
    default:
      assertNever(error);
  }
};

export { printError };
