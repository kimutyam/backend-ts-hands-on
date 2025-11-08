import { assertNever } from './assertNever.js';
import { IndivisibleBillError } from './indivisibleBillError.js';
import { NumberOfMembersError } from './numberOfMembersError.js';
import type { SplitBillError } from './splitBillError.js';

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
