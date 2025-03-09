import type { Brand } from 'ch6/branded_type/ex5/brand.js';

// type MyBrand = {
//   readonly [BrandTypeId]: {
//     readonly MyModule: 'MyModule';
//     readonly MyBrand: 'MyBrand';
//   };
// };
type MyBrand = Brand<'MyModule' | 'MyBrand'>;

export type { MyBrand };
