import { printError } from '../ex3233/printError.js';
import { splitBillAsync } from '../ex3235/splitBillAsync.js';

const result = await splitBillAsync(100, 1);
if (result.success) {
  console.log(result.data);
} else {
  printError(result.error);
}
