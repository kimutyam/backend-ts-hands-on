import { splitBill } from '3_bug_error/20_error/splitBill.js';

try {
  splitBill(100, 1);
} catch (e: unknown) {
  console.error('例外発生', e);
}
