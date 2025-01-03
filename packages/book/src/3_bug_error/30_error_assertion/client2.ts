import assert from 'node:assert';
import { splitBill } from './splitBill';

try {
  splitBill(100, 3);
} catch (e) {
  if (e instanceof Error) {
    if (e instanceof assert.AssertionError) {
      throw e;
    } else {
      console.log(e.message);
    }
  } else {
    throw e;
  }
}
