import { printError } from './printError.js';
import { splitBill } from './splitBill.js';

const result = splitBill(100, 1);
if (result.ok) {
  console.log(`Product: ${result.data.toString()}`);
} else {
  printError(result.error);
}
