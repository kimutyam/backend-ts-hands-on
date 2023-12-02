import { printError } from './printError';
import { splitBill } from './splitBill';

const result = splitBill(0, 1);
if (result.success) {
  console.log(`Product: ${result.data}`);
} else {
  printError(result.error);
}
