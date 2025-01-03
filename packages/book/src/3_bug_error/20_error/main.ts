import { splitBill } from './splitBill';

try {
  splitBill(100, 1);
} catch (e: unknown) {
  console.error('例外発生', e);
}
