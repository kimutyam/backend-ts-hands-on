import type { Brand } from 'ch6/ex6217/brand.js';

// type MyBrand = {
//   readonly [BrandTypeId]: {
//     readonly MyModule: 'MyModule';
//     readonly MyBrand: 'MyBrand';
//   };
// };
type MyBrand = Brand<'MyModule' | 'MyBrand'>;

export type { MyBrand };
