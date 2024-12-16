import { assertNever } from '../42_result/assertNever';
import { IndivisibleBillErrorKind } from './indivisibleBillError';
import { NumberOfMembersErrorKind } from './numberOfMembersError';
import type { SplitBillError } from './splitBillError';

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
