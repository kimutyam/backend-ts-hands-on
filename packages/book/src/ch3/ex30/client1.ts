import { splitBill } from 'ch3/ex30/splitBill.js';

try {
  splitBill(100, 0);
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message);
  } else {
    throw e;
  }
}
