import { printError } from '../42_result/printError.js';
import { splitBillAsync } from './splitBillAsync.js';

(async () => {
  const result = await splitBillAsync(100, 1);
  if (result.success) {
    console.log(result.data);
  } else {
    printError(result.error);
  }
})();
