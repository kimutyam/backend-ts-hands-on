import { printError } from './printError.js';
import { splitBill } from './splitBill.js';

const result = splitBill(100, 1);
if (result.success) {
  console.log(`Product: ${result.data}`);
} else {
  printError(result.error);
}
