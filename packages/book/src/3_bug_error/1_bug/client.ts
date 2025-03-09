import { recursiveFn } from '3_bug_error/1_bug/recursiveFn.js';

recursiveFn(); // 実行時にスタックオーバーフロー

console.log('手前で例外が送出されるため、到達しない');
