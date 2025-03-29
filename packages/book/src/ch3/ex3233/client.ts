import { printError } from 'ch3/ex3233/printError.js';
import { splitBill } from 'ch3/ex3233/splitBill.js';

const result = splitBill(100, 1);
if (result.success) {
  console.log(`Product: ${result.data.toString()}`);
} else {
  printError(result.error);
}
