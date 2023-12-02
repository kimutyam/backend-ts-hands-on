import { NumberOfMembersError } from '../15_custom_error/numberOfMembersError';
import { IndivisibleBillError } from '../16_custom_error_split_bill/indivisibleBillError';
import { assertNever } from './assertNever';
import type { SplitBillError } from './splitBillError';

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
