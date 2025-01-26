import { elementToBinaryNumber } from './elementToBinaryNumber.js';

// 3番目のindexはundefinedであり、toUpperCaseプロパティを持っていないためTypeErrorがthrowされる
elementToBinaryNumber([10, 15, 100], 3);
