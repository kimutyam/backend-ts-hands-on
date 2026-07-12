interface Clothes {
  size: number;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
interface ExtendedClothes extends Clothes {
  //      ^^
  // TS2430: Interface ExtendedClothes incorrectly extends interface Clothes Types
  //  of property size are incompatible.
  // Type string is not assignable to type number
  size: string;
}

export type { ExtendedClothes };
