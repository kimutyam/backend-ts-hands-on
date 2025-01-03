import { splitBill } from './splitBill';

try {
  splitBill(100, 0);
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message);
  } else {
    throw e;
  }
}
