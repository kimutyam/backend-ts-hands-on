import { printError } from '../ex233/printError.js';
import { splitBillAsync } from '../ex235/splitBillAsync.js';

const result = await splitBillAsync(100, 1);
if (result.success) {
  console.log(result.data);
} else {
  printError(result.error);
}
