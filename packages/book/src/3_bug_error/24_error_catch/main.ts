import { splitBill } from '../20_error/splitBill';

try {
  splitBill(100, 1);
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log(e.name, e.message, e.stack);
  } else {
    throw e;
  }
}
