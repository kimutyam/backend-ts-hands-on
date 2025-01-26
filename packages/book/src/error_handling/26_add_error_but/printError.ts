import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError.js';
import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError.js';
import { assertNever } from './assertNever.js';
import type { SplitBillError } from './splitBillError.js';

export function printError(error: SplitBillError): void {
  if (error instanceof NumberOfMembersError) {
    console.log(error.members);
    console.error(error.message);
  } else if (error instanceof IndivisibleBillError) {
    console.log(error.calculated);
    console.error(error.message);
  }

  // TS2345: Argument of type 'SplitBillError' is not assignable to parameter of type 'never'.Type 'BillError' is not assignable to type 'never'.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  assertNever(error);
}
