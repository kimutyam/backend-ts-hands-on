import { assertNever } from '../ex3233/assertNever.js';
import { IndivisibleBillErrorKind } from './indivisibleBillError.js';
import { NumberOfMembersErrorKind } from './numberOfMembersError.js';
import type { SplitBillError } from './splitBillError.js';

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
