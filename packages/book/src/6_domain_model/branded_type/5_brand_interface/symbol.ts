import type { Brand } from '6_domain_model/branded_type/5_brand_interface/brand.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SymbolA: unique symbol = Symbol('A');

// type MyBrand = {
//   readonly [BrandTypeId]: {
//     readonly [SymbolA]: typeof SymbolA; // SymbolAをキーとし、値はその型
//   };
// };
type MyBrand = Brand<typeof SymbolA>;

export type { MyBrand };
