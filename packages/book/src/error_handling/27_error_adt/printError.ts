import { assertNever } from '../26_add_error_but/assertNever.js';
import { BillErrorKind } from './billError.js';
import { IndivisibleBillErrorKind } from './indivisibleBillError.js';
import { NumberOfMembersErrorKind } from './numberOfMembersError.js';
import type { SplitBillError } from './splitBillError.js';

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
