import { IndivisibleBillErrorKind } from 'ch3/ex3230/indivisibleBillError.js';
import { NumberOfMembersErrorKind } from 'ch3/ex3230/numberOfMembersError.js';
import type { SplitBillError } from 'ch3/ex3230/splitBillError.js';
import { assertNever } from 'ch3/ex3233/assertNever.js';

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
