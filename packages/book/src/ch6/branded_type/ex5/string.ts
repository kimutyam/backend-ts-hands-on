import type { Brand } from 'ch6/branded_type/ex5/brand.js';

// type MyBrand = {
//   readonly [BrandTypeId]: {
//     readonly MyBrand: 'MyBrand';
//   };
// };
type MyBrand = Brand<'MyBrand'>;

export type { MyBrand };
