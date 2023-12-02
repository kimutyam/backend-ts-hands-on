import { printError } from './printError';
import { splitBill } from './splitBill';

const result = splitBill(100, 1);
if (result.success) {
  console.log(result.data);
} else {
  printError(result.error);
}
