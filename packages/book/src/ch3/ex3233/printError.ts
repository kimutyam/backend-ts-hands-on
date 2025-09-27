import { assertNever } from 'ch3/ex3233/assertNever.js';
import { IndivisibleBillError } from 'ch3/ex3233/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex3233/numberOfMembersError.js';
import type { SplitBillError } from 'ch3/ex3233/splitBillError.js';

const printError = (error: SplitBillError): void => {
  switch (error.kind) {
    case NumberOfMembersError.kind:
      console.log(error.members);
      console.error(error.message);
      break;
    case IndivisibleBillError.kind:
      console.log(error.bill);
      console.error(error.message);
      break;
    default:
      assertNever(error);
  }
};

export { printError };
