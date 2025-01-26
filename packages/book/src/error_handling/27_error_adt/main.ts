import { printError } from './printError.js';
import { splitBill } from './splitBill.js';

const result = splitBill(100, 1);
if (result.success) {
  console.log(result.data);
} else {
  printError(result.error);
}
