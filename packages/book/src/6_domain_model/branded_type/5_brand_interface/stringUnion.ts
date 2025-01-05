import type { Brand } from './brand';

// type MyBrand = {
//   readonly [BrandTypeId]: {
//     readonly MyModule: 'MyModule';
//     readonly MyBrand: 'MyBrand';
//   };
// };
type MyBrand = Brand<'MyModule' | 'MyBrand'>;

export type { MyBrand };
