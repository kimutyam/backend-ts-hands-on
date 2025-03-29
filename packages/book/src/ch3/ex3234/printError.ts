import { assertNever } from 'ch3/ex3233/assertNever.js';
import { IndivisibleBillErrorKind } from 'ch3/ex3234/indivisibleBillError.js';
import { NumberOfMembersErrorKind } from 'ch3/ex3234/numberOfMembersError.js';
import type { SplitBillError } from 'ch3/ex3234/splitBillError.js';

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
