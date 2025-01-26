import { recursiveFn } from './recursiveFn.js';

try {
  recursiveFn(); // 実行時にスタックオーバーフロー
} catch (e) {
  console.error(e); // RangeError: Maximum call stack size exceeded
}

console.log('catch句で回復しているため、到達する');

export { recursiveFn };
