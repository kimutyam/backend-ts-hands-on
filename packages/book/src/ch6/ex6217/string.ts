import type { Brand } from './brand.js';

// type MyBrand = {
//   readonly [BrandTypeId]: {
//     readonly MyBrand: 'MyBrand';
//   };
// };
type MyBrand = Brand<'MyBrand'>;

export type { MyBrand };
