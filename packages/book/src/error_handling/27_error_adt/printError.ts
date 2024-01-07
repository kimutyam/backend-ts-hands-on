import { assertNever } from '../26_add_error_but/assertNever';
import { BillErrorKind } from './billError';
import { IndivisibleBillErrorKind } from './indivisibleBillError';
import { NumberOfMembersErrorKind } from './numberOfMembersError';
import type { SplitBillError } from './splitBillError';

export function printError(error: SplitBillError): void {
  switch (error.kind) {
    case NumberOfMembersErrorKind:
      console.log(error.members);
      console.error(error.message);
      break;
    case IndivisibleBillErrorKind:
      console.log(error.calculated);
      console.error(error.message);
      break;
    case BillErrorKind:
      console.log(error.bill);
      console.error(error.message);
      break;
    default:
      assertNever(error);
  }
}
