import { splitBill } from '../ex3222/splitBill.js';

try {
  splitBill(100, 1);
  // 1
} catch (e: unknown) {
  // 2
  if (e instanceof Error) {
    console.log(e.name, e.message, e.stack);
    // 3
  } else {
    throw e;
  }
}
