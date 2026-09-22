interface Clothes {
  size: number;
}

type ExtendedClothes = Clothes & { size: string };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const clothes: ExtendedClothes = { size: 'a' }; // 1
//                                ^^
// TS2322: Type string is not assignable to type never
// The expected type comes from property 'size' which is declared here on type 'ExtendedClothes'

console.log(clothes);
