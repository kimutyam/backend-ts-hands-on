import { elementToBinaryNumber } from '../5_bug/elementToBinaryNumber';

try {
  // 3番目のindexはundefinedであり、toUpperCaseプロパティを持っていないためTypeErrorがthrowされる
  elementToBinaryNumber([10, 15, 100], 3);
  console.log('この行は実行されない');
} catch (e: unknown) {
  console.error(e);
} finally {
  console.log('最後に呼び出される');
}
