import type { Brand } from 'ch6/archive/ex621130/brand.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SymbolA: unique symbol = Symbol('A');

// type MyBrand = {
//   readonly [BrandTypeId]: {
//     readonly [SymbolA]: typeof SymbolA; // SymbolAをキーとし、値はその型
//   };
// };
type MyBrand = Brand<typeof SymbolA>;

export type { MyBrand };
