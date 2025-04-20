import type { Brand } from 'ch6/archive/ex621130/brand.js';

// type MyBrand = {
//   readonly [BrandTypeId]: {
//     readonly MyBrand: 'MyBrand';
//   };
// };
type MyBrand = Brand<'MyBrand'>;

export type { MyBrand };
