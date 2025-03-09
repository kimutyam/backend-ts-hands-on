import type { Brand } from '6_domain_model/branded_type/5_brand_interface/brand.js';

// type MyBrand = {
//   readonly [BrandTypeId]: {
//     readonly MyBrand: 'MyBrand';
//   };
// };
type MyBrand = Brand<'MyBrand'>;

export type { MyBrand };
