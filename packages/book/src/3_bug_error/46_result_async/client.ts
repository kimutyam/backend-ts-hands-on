import { printError } from '3_bug_error/42_result/printError.js';
import { splitBillAsync } from '3_bug_error/46_result_async/splitBillAsync.js';

const result = await splitBillAsync(100, 1);
if (result.success) {
  console.log(result.data);
} else {
  printError(result.error);
}
