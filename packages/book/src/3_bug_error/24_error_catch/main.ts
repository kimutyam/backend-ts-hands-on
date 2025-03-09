import { splitBill } from '3_bug_error/20_error/splitBill.js';

try {
  splitBill(100, 1);
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log(e.name, e.message, e.stack);
  } else {
    throw e;
  }
}
