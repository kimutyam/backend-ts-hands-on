import { printError } from 'ch3/ex42/printError.js';
import { splitBillAsync } from 'ch3/ex46/splitBillAsync.js';

const result = await splitBillAsync(100, 1);
if (result.success) {
  console.log(result.data);
} else {
  printError(result.error);
}
