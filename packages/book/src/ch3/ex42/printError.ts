import { assertNever } from 'ch3/ex42/assertNever.js';
import type { SplitBillError } from 'ch3/ex42/splitBillError.js';
import { IndivisibleBillError } from 'ch3/ex3225/indivisibleBillError.js';
import { NumberOfMembersError } from 'ch3/ex3225/numberOfMembersError.js';

const printError = (error: SplitBillError): void => {
  if (error instanceof NumberOfMembersError) {
    console.log(error.members);
    console.error(error.message);
  } else if (error instanceof IndivisibleBillError) {
    console.log(error.bill);
    console.error(error.message);
  } else {
    assertNever(error);
  }
};

export { printError };
