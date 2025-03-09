import { printError } from '3_bug_error/42_result/printError.js';
import { splitBill } from '3_bug_error/42_result/splitBill.js';

const result = splitBill(100, 1);
if (result.success) {
  console.log(`Product: ${result.data}`);
} else {
  printError(result.error);
}
