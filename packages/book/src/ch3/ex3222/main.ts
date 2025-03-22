import { splitBill } from 'ch3/ex3222/splitBill.js';

try {
  splitBill(100, 1);
} catch (e: unknown) {
  console.error('例外発生', e);
}
