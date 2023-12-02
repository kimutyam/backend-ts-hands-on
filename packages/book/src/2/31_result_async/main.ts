import { printError } from '../26_add_error_but/printError';
import { splitBillAsync } from './splitBillAsync';

(async () => {
  const result = await splitBillAsync(100, 1);
  if (result.success) {
    console.log(result.data);
  } else {
    printError(result.error);
  }
})();
